import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useSwipeable } from "react-swipeable";
import { DataGrid } from "@mui/x-data-grid";
import { useAds } from "providers/AdProvider";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Title from "components/Title";
import { useEffect, useState } from "react";
import Pagination from "components/Pagination/Pagination";
import { Edit } from "react-feather";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";
import PlanService from "services/plan";
import { Spacer } from "theme/styled";
import { decimalToReal } from "utils/index";

export default function PlanList() {
  const { list, setList } = useAds();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const fetchData = async (page = 1) => {
    const res = await PlanService.index(page);
    setList(res);
  };

  const sendDelete = async (id) => {
    const res = await PlanService.del(id);

    if (res) {
      toast("Deletado com sucesso!");
      await fetchData();
    }
  };

  const handlePageChange = (pageNumber) => fetchData(page);

  useEffect(() => {
    // if (!list.data)
    fetchData();
  }, []);

  const handleDeleteClick = (id) => {
    confirmAlert({
      title: "Atenção!",
      message: "Tem certeza de que deseja deletar este item?",
      buttons: [
        {
          label: "Sim",
          onClick: () => sendDelete(id),
        },
        {
          label: "Não",
          onClick: () => null,
        },
      ],
    });
  };

  return (
    <>
      <Title>Planos de anuncio</Title>

      {/* <Button
        type="submit"
        endIcon={<Add />}
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={() => navigate("/plans/create")}
      >
        Cadastrar novo plano de anuncio
      </Button> */}
      <Spacer />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Título</TableCell>
              <TableCell align="right">Descrição</TableCell>
              <TableCell align="right">Valor</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.data &&
              list.data.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">
                    {decimalToReal(row.price)}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="Example"
                      onClick={() =>
                        navigate("/auth/plans/edit/", {
                          state: {
                            row,
                          },
                        })
                      }
                    >
                      <Edit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {list.meta && (
        <Pagination
          page={page}
          lastPage={list.meta.last_page}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}
