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
  TableRow
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Title from "components/Title";
import { useEffect, useState } from "react";
import Pagination from "components/Pagination/Pagination";
import { Edit, Trash } from "react-feather";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";
import { AddAPhoto } from "@mui/icons-material";
import BannerService from "services/banner";

export default function BannerList() {
  const { list, setList } = useAds();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const fetchData = async (page = 1) => {
    const res = await BannerService.index(page);
    setList(res);
  };

  const sendDelete = async (id) => {
    const res = await BannerService.del(id);

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
          onClick: () => sendDelete(id)
        },
        {
          label: "Não",
          onClick: () => null
        }
      ]
    });
  };

  return (
    <>
      <Title>Banners</Title>

      <Button
        type="submit"
        endIcon={<AddAPhoto />}
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={() => navigate("/auth/banners/create")}
      >
        Cadastrar novo banner
      </Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Imagem</TableCell>
              <TableCell align="left">Título</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Posição</TableCell>
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
                  <TableCell align="left">
                    <img
                      src={`${process.env.REACT_APP_API_URL}${row.thumbnail_url}`}
                      alt=""
                      width="80px"
                    />
                  </TableCell>

                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="right">{row.title}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                  <TableCell align="right">{row.position}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="Example"
                      onClick={() =>
                        navigate("/auth/ads/edit", {
                          state: {
                            row
                          }
                        })
                      }
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteClick(row.id)}
                      aria-label="Example"
                    >
                      <Trash />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {list.meta && (
          <Pagination
            page={page}
            lastPage={list.meta.last_page}
            onPageChange={handlePageChange}
          />
        )}
      </TableContainer>
    </>
  );
}
