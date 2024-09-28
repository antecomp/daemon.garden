import random

def decision(prob):
    return random.random() < prob

MOVE_TYPES = {
        'A': "Attack",
        'D': "Defend",
        'H': "Heal",
        'E': "Evade",
        'O': "Observe",
        'R': "Repeat", # aka Prolong
        'P': "Prepare",
        'F': "Familiar" # will be unused for now.
}

#class StatusEffect:
#    def __init__(self, name, level, duration):
#        self.name = name
#        self.level = level # multiplier for status amount (vuln can be higher/lower)
#        self.duration = duration
#
#    def __getitem__(self, item):
#        if item == 'level':
#            return self.level
#        if item == 'name':
#            return self.name
#        if item == 'duration':
#            return self.duration
#        print('illegal get on StatusEffect')
#        return 'ERROR'


class Automata:
    def __init__(self, name, health=10, maxhealth=10):
        self.name = name
        self.health = health
        self.maxhealth = maxhealth
        self.statuses = {}

    def take_damage(self, damage):
        self.health = max(0, self.health - damage)
        if self.health == 0:
            print("self.name " + "has died")
        else:
            print(f"{self.name} takes {damage} damage. Current health: {self.health}")

    def heal(self, amount):
        self.health = min(self.maxhealth, self.health + amount) # cant go above max health
        print(f"{self.name} heals {amount}. Current health {self.health}")

    def add_status(self, status_name, level, duration): 
        # Check if the status already exists
        for status in self.statuses:
            if status == status_name:
                # Update the existing status effect's level and duration
                self.statuses[status]['level'] = level
                self.statuses[status]['duration'] = duration
                print(f"{self.name}'s status {status_name} updated to Level {level} for {duration} turns.")
                return

        # Otherwise just add it.. 
        status = {
                "level": level,
                "duration": duration
        }
        self.statuses[status_name] = status
        print(f"{self.name} gains status: {status_name} for {duration} turns.")

    def update_statuses(self):
        expired_statuses = []
        for status in self.statuses:
            if self.statuses[status]['duration'] > 1:
                self.statuses[status]['duration'] -= 1
            else:
                expired_statuses.append(status)

        for status in expired_statuses:
            del self.statuses[status]
            print(f"{self.name}'s {status} expired.")

    def has_status(self, status_name):
        return status_name in self.statuses



def calculate_move_outcome(player_seq: list[str], enemy_seq: list[str], current_index: int, player: Automata, enemy: Automata):
    player_current_move = player_seq[current_index]
    enemy_current_move = enemy_seq[current_index]
    print(f"Player will {MOVE_TYPES[player_current_move]} and Enemy will {MOVE_TYPES[enemy_current_move]}")

    # determine temporary statuses enforced by the move before calculating interactions...
    #   aka the "on OP" statuses
    if player_current_move == 'H' or player_current_move == 'P':
        if player.has_status('vul'): 
            player.add_status('vul', 2, 1)
        else:
            player.add_status('vul', 1, 1)

    if enemy_current_move == 'H' or enemy_current_move == 'P':
        if enemy.has_status('vul'): 
            enemy.add_status('vul', 2, 1)
        else:
            enemy.add_status('vul', 1, 1)

    # determine multipliers based on statuses - incoming mult (vuln) eller outgoing mult (prepared)
    player_incoming_mult = 1.0
    player_outgoing_mult = 1.0

    player_incoming_mult *= pow(1.5, player.statuses.get('vul', {'level': 0})['level']) # no vul - 1, vul1 = 1.5, vul2 = 2.25
    player_outgoing_mult *= pow(2, player.statuses.get('prep', {'level': 0})['level']) # prepared *= 2, prep + repeat = *= 4


    enemy_incoming_mult = 1.0
    enemy_outgoing_mult = 1.0

    enemy_incoming_mult *= pow(1.5, enemy.statuses.get('vul', {'level': 0})['level']) # no vul - 1, vul1 = 1.5, vul2 = 2.25
    enemy_outgoing_mult *= pow(2, enemy.statuses.get('prep', {'level': 0})['level']) # prepared *= 2, prep + repeat = *= 4


    # Start with the "breakable" moves to quickly logic through them
    if enemy_current_move == 'A':
        if player_current_move == 'H' or player_current_move == 'P':
            print(f"{player.name} attacked while vulnerable!")
            player.take_damage(enemy_outgoing_mult * player_incoming_mult)
            return
    if player_current_move == 'A':
        if enemy_current_move == 'H' or enemy_current_move == 'P':
            print(f"{enemy.name} attacked while vulnerable!")
            enemy.take_damage(player_outgoing_mult * enemy_incoming_mult)
            return

    # HANDLE DEFEND APPLICATION FOR PLAYER AND PC FIRST.

    if player_current_move == 'D':
        print("Player defends.")
        if player.statuses.get('prep', False):
            player_incoming_mult *= pow(0.5, player.statuses.get('prep', {'level': 0})['level'] + 1) # Defend inversely scales damage based on prep. Baseline 0.5
        else:
            player_incoming_mult *= 0.5

    if enemy_current_move == 'D':
        print("Enemy defends.")
        if enemy.statuses.get('prep', False):
            enemy_incoming_mult *= pow(0.5, enemy.statuses.get('prep', {'level': 0})['level'] + 1) # Defend inversely scales damage based on prep. Baseline 0.5
        else:
            enemy_incoming_mult *= 0.5

    

    print(f"Player Multipliers: i-{player_incoming_mult} o-{player_outgoing_mult}")
    print(f"Enemy Multipliers: i-{enemy_incoming_mult} o-{enemy_outgoing_mult}")
    
    
    # PLAYER MOVES ########################################

    # Heal - Note that the break condition is handled above. Breakable moves are assumed to have worked now.
    if player_current_move == 'H':
        player.heal(player_outgoing_mult)

    # Attack
    if player_current_move == 'A' and not enemy_current_move == 'E': # handle enemy evade calc later.
        enemy.take_damage(player_outgoing_mult * enemy_incoming_mult)

    # Prepare
    if player_current_move == 'P':
        player.add_status('prep', 1, 2)

    # Observe 
    if player_current_move == 'O':
        enemy.add_status('vul', 1, 2)

    # Evade
    if player_current_move == 'E':
        if enemy_current_move == 'A':
            print(f"Evade Probability: {1 - pow(0.5, player_outgoing_mult)}")
            if decision(1 - pow(0.5, player_outgoing_mult)): # 0.5 base, then 0.75, then 0.93 
                print("Player Evades")
                return
            else:
                print("Player fails to evade")
                player.take_damage(enemy_outgoing_mult * player_incoming_mult)
                return

    # Repeat
    #if player_current_move == 'R':
        # ignore for now. I want to test other logic.

    
    # ENEMY MOVES ######################################################3

    # Heal - Note that the break condition is handled above. Breakable moves are assumed to have worked now.
    if enemy_current_move == 'H':
        enemy.heal(enemy_outgoing_mult)

    # Attack
    if enemy_current_move == 'A':
        player.take_damage(enemy_outgoing_mult * player_incoming_mult)

    # Prepare
    if enemy_current_move == 'P':
        enemy.add_status('prep', 1, 2)

    # Observe 
    if enemy_current_move == 'O':
        player.add_status('vul', 1, 2)

    # Evade
    if enemy_current_move == 'E':
        if player_current_move == 'A':
            print(f"Evade Probability: {1 - pow(0.5, enemy_outgoing_mult)}")
            if decision(1 - pow(0.5, enemy_outgoing_mult)): # 0.5 base, then 0.75, then 0.93 
                print("enemy Evades")
                return
            else:
                print("enemy fails to evade")
                enemy.take_damage(player_outgoing_mult * enemy_incoming_mult)
                return
    
    # Repeat
    #if player_current_move == 'R':
        # ignore for now. I want to test other logic.




player = Automata(input('Player name: '))
enemy = Automata(input('Dæmon name: '))


while True:
    enemy_runes = input("enter daemon runes: ").split()
    player_runes = input("enter player runes: ").split()
    print("---------------------------------------------------------------")

    for turn in range(0,5):
       calculate_move_outcome(player_runes, enemy_runes, turn, player, enemy) 
       player.update_statuses()
       enemy.update_statuses()
       print("---------------------------------------------------------------")

    print("END SEQUENCE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    print("RESULTS:")
    print(f"Player health: {player.health} and has statuses: {' '.join(player.statuses.keys())}")
    print(f"Enemy health: {enemy.health} and has statuses: {' '.join(enemy.statuses.keys())}")
    print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")

# NOTE MAKE SURE YOU'RE DO THE STATUS COUNTDOWN FUNC AFTER EVERY MOVE ITERATION - NOT DOING IT IN CALC FUNCTION BCZ OF EARLY RETURNS.
