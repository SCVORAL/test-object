import { useMemo, useState } from "react";
import { useAppSelector } from "../../store/hooks/useAppSelector";
import type { Server } from "../../store/types/serversTypes";
import sortImg from "../../assets/img/sort.svg";
import allGoodImg from "../../assets/img/all-good.svg";
import moderateImg from "../../assets/img/moderate.svg";
import importantImg from "../../assets/img/important.svg";
import criticalImg from "../../assets/img/critical.svg";
import "./Table.scss";
import DoubleColorBar from "../DoubleColorBarProps";

type SortKey = keyof Server | "cpuUsed" | "memoryUsed";

type SortConfig = {
  key: string;
  direction: "asc" | "desc";
} | null;

const icons = {
  important: importantImg,
  "all good": allGoodImg,
  moderate: moderateImg,
  critical: criticalImg,
};

const Table = () => {
  const dataRedux = useAppSelector((state) => state.servers.list);
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);

  const sortedData = useMemo(() => {
    if (!dataRedux) return [];

    return [...dataRedux].sort((a, b) => {
      if (!sortConfig) return 0;

      const { key, direction } = sortConfig;

      const getValue = (item: Server) => {
        if (key === "cpuUsed") return item.cpu.used;
        if (key === "memoryUsed") return item.memory.used;
        return item[key as keyof Server];
      };

      const aVal = getValue(a);
      const bVal = getValue(b);

      if (aVal < bVal) return direction === "asc" ? -1 : 1;
      if (aVal > bVal) return direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [dataRedux, sortConfig]);

  const requestSort = (key: SortKey, direction: "asc" | "desc" = "asc") => {
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <table className="table">
      <thead className="table__head">
        <tr className="table__row">
          <th className="table__cell table__cell--head">ID</th>
          <th
            className="table__cell table__cell--head table__cell--sortable"
            onClick={() => requestSort("state")}
          >
            State <img src={sortImg} alt="sort" />
          </th>
          <th className="table__cell table__cell--head">Host server</th>
          <th
            className="table__cell table__cell--head table__cell--sortable"
            onClick={() => requestSort("cpuUsed")}
          >
            CPU <img src={sortImg} alt="sort" />
          </th>
          <th
            className="table__cell table__cell--head table__cell--sortable"
            onClick={() => requestSort("memoryUsed")}
          >
            Memory <img src={sortImg} alt="sort" />
          </th>
          <th
            className="table__cell table__cell--head table__cell--sortable"
            onClick={() => requestSort("uptime")}
          >
            Uptime <img src={sortImg} alt="sort" />
          </th>
          <th className="table__cell table__cell--head">Alerts</th>
        </tr>
      </thead>
      <tbody className="table__body">
        {sortedData.map((row, i) => (
          <tr key={i} className="table__row">
            <td className="table__cell">{row.id}</td>
            <td className={"table__cell"}>
              <span
                className={
                  "table__cell--state table__cell--state_" +
                  row.state.toLowerCase()
                }
              >
                {row.state}
              </span>
            </td>
            <td className="table__cell">{row.host}</td>
            <td className="table__cell">
              {row.cpu.used}
              <DoubleColorBar
                firstValue={row.cpu.used}
                secondValue={row.cpu.total}
                firstColor="#5f3196"
                secondColor="#f9fafb"
              />
            </td>
            <td className="table__cell">
              {row.memory.used}
              <DoubleColorBar
                firstValue={row.memory.used}
                secondValue={row.memory.total}
                firstColor="#5f3196"
                secondColor="#f9fafb"
              />
            </td>
            <td className="table__cell">{row.uptime}</td>
            <td className="table__cell table__cell--type">
              <img src={icons[row.alert.type]} alt={row.alert.type} />
              <b>{row.alert.count}</b>

              {row.alert.type}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
