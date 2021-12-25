import React from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import AddCell from "./add-cell";
import CellListItem from "./cell-list-item";


const CellList: React.FC = () => {
    const cells = useTypedSelector(({ cells }) => {
        return cells!.order.map((id: any) => cells!.data[id])
    });


    const renderedCells = cells.map((cell =>
    (
        <React.Fragment key={cell.id}>
            <AddCell nextCellId={cell.id} />
            <CellListItem cell={cell} />
        </React.Fragment>
    )));


    return (
        <div>
            {renderedCells}
            <AddCell nextCellId={null} />
        </div>
    )
}

export default CellList;
