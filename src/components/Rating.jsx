const Rating = ({ value, color }) => {
    return (
        <div className="rating">
            <span>
                <i style={{ color }} className={
                    value >= 1
                        ? "fas fa-star fa-xl"
                        : value >= 0.5
                            ? "fas fa-star-half-alt fa-xl"
                            : "far fa-star fa-xl"}></i>
            </span>
            <span>
                <i style={{ color }} className={
                    value >= 2
                        ? "fas fa-star fa-xl"
                        : value >= 1.5
                            ? "fas fa-star-half-alt fa-xl"
                            : "far fa-star fa-xl"}></i>
            </span>
            <span>
                <i style={{ color }} className={
                    value >= 3
                        ? "fas fa-star fa-xl"
                        : value >= 2.5
                            ? "fas fa-star-half-alt fa-xl"
                            : "far fa-star fa-xl"}></i>
            </span>
            <span>
                <i style={{ color }} className={
                    value >= 4
                        ? "fas fa-star fa-xl"
                        : value >= 3.5
                            ? "fas fa-star-half-alt fa-xl"
                            : "far fa-star fa-xl"}></i>
            </span>
            <span>
                <i style={{ color }} className={
                    value >= 5
                        ? "fas fa-star fa-xl"
                        : value >= 4.5
                            ? "fas fa-star-half-alt fa-xl"
                            : "far fa-star fa-xl"}></i>
            </span>
        </div>
    )
}

export default Rating;