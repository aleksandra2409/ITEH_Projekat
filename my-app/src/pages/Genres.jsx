import { DataGrid } from "@mui/x-data-grid";

export default function Genres(props) {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      sortable: true,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      sortable: true,
      flex: 1,
    },
    {
      field: "created_at",
      headerName: "Created At",
      sortable: true,
      flex: 1,
    },
  ];

  const rows = props.genres;

  return (
    <>
      <div className="table-data">
        <div className="table-data__title">Genres</div>
        <div className="table-data__content">
          <DataGrid
            rows={rows}
            columns={columns}
            hideFooter={true}
            experimentalFeatures={{ newEditingApi: true }}
            sx={{
                border: "none",
                color: "#f3f3f3;"
            }}
          />
        </div>
      </div>
    </>
  );
}
