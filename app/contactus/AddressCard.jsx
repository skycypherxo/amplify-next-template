const AddressCard = (props) => {
    return (
        <div className="xl:w-[450px] lg:w-[350px] lg:pb-4">
            <p className="font-semibold tracking-wider border-b-4 mb-3">
                Contact
            </p>
            <p>{props.add}</p>
            <p>Mumbai, Maharashtra, India</p>
        </div>
    )
}

export default AddressCard;
