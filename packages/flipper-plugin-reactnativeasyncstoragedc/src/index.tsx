import React from "react";
import {
  createTablePlugin,
  ManagedDataInspector,
  Panel,
  TableBodyRow,
  Text,
} from "flipper";

type Row = {
  key: string;
  content: string;
};

const columns = {
  key: {
    value: "Key",
  },
  content: {
    value: "Content",
  },
};

const columnSizes = {
  key: "15%",
  content: "flex",
};

function renderSidebar(row: Row) {
  return (
    <Panel floating={false} heading={"Info"}>
      <ManagedDataInspector data={row} expandRoot={true} />
    </Panel>
  );
}

function buildRow(row: Row): TableBodyRow {
  return {
    columns: {
      key: {
        value: <Text>{row.key}</Text>,
        // filterValue: row.key,
      },
      content: {
        value: <Text>{row.content}</Text>,
        // filterValue: row.content,
      },
    },
    key: row.key,
    copyText: JSON.stringify(row),
    filterValue: `${row.key} ${row.content}`,
  };
}

export default createTablePlugin<Row>({
  method: "newRow",
  columns,
  columnSizes,
  renderSidebar,
  buildRow,
});
