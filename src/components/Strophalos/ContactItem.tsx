const ContactItem = ({name, onClick}: {name: string, onClick(): void}) => {
	return (
		<div className="contact-item" onClick={onClick}>{name}</div>
	)
}

export default ContactItem;