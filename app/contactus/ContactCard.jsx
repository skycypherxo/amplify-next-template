const ContactCard = (props) => {
    return (
        <div className="xl:w-[450px] lg:w-[350px]">
            <p className="font-semibold tracking-wider border-b-4 mb-1">
                For {props.queryName} Related Queries: {props.name}
            </p>
            <p className="mb-1">
                Email: {props.email}
            </p>
            <p className="mb-1">
                Tel: {props.tel1}
            </p>
            <p className="mb-1">
                Tel: {props.tel2}
            </p>
        </div>
    )
}

export default ContactCard