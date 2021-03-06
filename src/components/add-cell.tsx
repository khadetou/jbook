import "./add-cell.css";
import { useActions } from "../hooks/use-actions";


interface AddCellProps {
    nextCellId: string | null;
    forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ nextCellId, forceVisible }) => {
    const { insertCellBefore } = useActions();
    return (
        <div className={`add-cell ${forceVisible && 'force-visible'}`} >
            <div className="add-buttons">
                <button className="button is-rounded is-primary is-small" onClick={() => insertCellBefore(nextCellId, "code")}>
                    <span className="icon is-small">
                        <i className="fas fa-plus"></i>
                    </span>
                    Code
                </button>
                <button className="button is-rounded is-primary is-small" onClick={() => insertCellBefore(nextCellId, "text")}>
                    <span className="icon is-small">
                        <i className="fas fa-plus"></i>
                    </span>
                    Text
                </button>
            </div>
            <div className="divider"></div>
        </div>
    )
}

export default AddCell;
