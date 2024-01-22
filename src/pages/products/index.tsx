import {useEffect, useState} from "react";
import {SimpleDataTable} from "../../layouts/components/SimpleDataTable";
import {ProductDataCreation, ProductEditModal} from "../../layouts/components/modal/ProductEditModal";
import {useApiService} from "../../hooks/useApiService";
import {ServiceMethodsType} from "../../context/ServiceApiContext";
import {ProductData} from "../../services/types/product-data.type";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import Button from "@mui/material/Button";
import {useRouter} from "next/router";

export default function Products() {
  const [openModalEditing, setOpenModalEditing] = useState<boolean>(false);
  const [openModalCreation, setOpenModalCreation] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [productToDelete, setProductToDelete] = useState<ProductData | null>(null);
  const [productToEdit, setProductToEdit] = useState<ProductData | null>(null);

  const service: ServiceMethodsType = useApiService();
  const router = useRouter();

  const handleClickOpenModalEditing = (id: number | null = null) => {
    setOpenModalEditing(true);
    if (!id) {
      setProductToEdit(null);
      setProductToDelete(null)
      return;
    }
    const productToEdit = products.find(product => product.id === id);
    if (!productToEdit) return;
    setProductToEdit(productToEdit);
  };

  const handleClickOpenModalCreation = (id: number | null = null) => {
    setOpenModalCreation(true);
  };

  const handleClickCloseModalEditing = () => {
    setOpenModalEditing(false);
  };

  const handleDelete = (target: number) => {
    const productToDelete = products.find(product => product.id === target);
    if (!productToDelete) return;
    setProductToDelete(productToDelete);
    setOpenDeleteDialog(true);
  }

  const handleConfirmDelete = async (): Promise<void> => {
    if (!productToDelete) return;
    setProducts(products.filter(product => product.id !== productToDelete.id));
    handleCloseDeleteDialog();
    await service.deleteProduct(productToDelete.id);
  }

  const handleClickCloseModalCreation = () => {
    setOpenModalCreation(false);
  }

  const handleConfirmCreate = async (data: ProductDataCreation) => {
    await handleConfirmCreateOrUpdate(data);
    handleClickCloseModalCreation();
  }

  const handleConfirmUpdate = async (data: ProductDataCreation) => {
    await handleConfirmCreateOrUpdate(data);
    handleClickCloseModalEditing();
  }

  const handleCloseDeleteDialog = () => {
    setProductToEdit(null);
    setProductToDelete(null)
    setOpenDeleteDialog(false);
  }

  const handleConfirmCreateOrUpdate = async (data: ProductDataCreation) => {
    data.id
      ? await service.updateProduct(data)
      : await service.createProduct(data);
    await fetchProducts();
    handleClickCloseModalEditing();
  }

  const fetchProducts = async () => {
    const response = await service.fetchProducts();
    if (!response) return console.log('Error');
    setProducts(response as ProductData[]);
  }

  useEffect(() => {
    fetchProducts();
    if (router.query.create) {
      handleClickOpenModalCreation();
    }
  }, []);

  useEffect(() => {
    if (router.query.create) {
      handleClickOpenModalCreation();
    }
  }, [router.query.create]);

  return (
    <>
      <SimpleDataTable
        title={'Products'}
        onCreate={handleClickOpenModalCreation}
        onEdit={(target: string|number) => handleClickOpenModalEditing(Number(target))}
        onDelete={(target: string|number) => handleDelete(Number(target))}
        target={'id'}
        fields={[
          { name: 'id', label: 'Id', align: 'left' },
          { name: 'name', label: 'Product Name', align: 'left' },
          { name: 'price', label: 'Price', align: 'right' },
          { name: 'categoryName', label: 'Category', align: 'right' },
          { name: 'date', label: 'Date', align: 'center' },
        ]}
        data={products}
      />
      <ProductEditModal
        isOpen={openModalEditing}
        onClose={handleClickCloseModalEditing}
        onConfirm={handleConfirmUpdate}
        data={productToEdit}
      />

      <ProductEditModal
        isOpen={openModalCreation}
        onClose={handleClickCloseModalCreation}
        onConfirm={handleConfirmCreate}
      />
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure you want to delete ${productToDelete?.name} ?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
