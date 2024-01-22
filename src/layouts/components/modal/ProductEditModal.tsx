import {Dialog, DialogActions, DialogContent, DialogTitle, Select, SelectChangeEvent} from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import {useApiService} from "../../../hooks/useApiService";
import {CategoryData} from "../../../services/types/category-data.type";

export type ProductDataCreation = {
  name: string,
  price: number,
  categoryId: number | null,
  id: number | null
}

type Error = {
  productName: boolean,
  price: boolean,
  categoryId: boolean
}
type Props = {
  isOpen: boolean,
  onClose: () => void,
  onConfirm: (data: ProductDataCreation) => void,
  data?: ProductDataCreation | null
}

export function ProductEditModal({isOpen, onClose, onConfirm, data}: Props) {
  const [selectCategoryId, setSelectCategoryId] = useState(Number(data?.categoryId) || null);
  const [productName, setProductName] = useState(data?.name || '');
  const [price, setPrice] = useState(data?.price || 0);
  const [error, setError] = useState<Error>({} as Error);
  const [categories, setCategories] = useState<CategoryData[]>([]);

  const service = useApiService();

  const handleChangeSelectCategory = (categoryId: number) => {
    setSelectCategoryId(categoryId);
  }

  const handleChangeProductName = (value: string) => {
    setError({...error, productName: false})
    setProductName(value);
  }

  const handleChangePrice = (value: number) => {
    setError({...error, price: false})
    setPrice(value);
  }

  const handleConfirm = () => {
    if (productName === '') {
       setError({...error, productName: true});
       return;
    }
    if (price === 0) {
       setError({...error, price: true});
       return;
    }
    onConfirm({
      name: productName,
      price: price,
      categoryId: selectCategoryId,
      id: data?.id || null
    })
  }

  const fetchCategories = async () => {
    const response = await service.fetchCategories();
    if (!response) return console.log('Error');
    setCategories(response as CategoryData[]);
  }

  useEffect(() => {
    setPrice(data?.price || 0);
    setProductName(data?.name || '');
    setSelectCategoryId(Number(data?.categoryId) || null);
    fetchCategories();
  }, []);

  useEffect(() => {
    setPrice(data?.price || 0);
    setProductName(data?.name || '');
    setSelectCategoryId(Number(data?.categoryId) || null);
  }, [data]);

  return (
    <Dialog
      fullWidth
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Create new Product"}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="productName"
              name="productName"
              label="Product Name"
              type="text"
              fullWidth
              variant="standard"
              error={error.productName}
              helperText="Product name is required."
              value={productName}
              onChange={(event) => handleChangeProductName(event.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="price"
              name="price"
              label="Price"
              type="text"
              fullWidth
              variant="standard"
              error={error.price}
              helperText="Price is required."
              value={price}
              onChange={(event) => handleChangePrice(Number(event.target.value))}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="standard" sx={{ m: 1 }}>
              <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
              <Select
                error={error.categoryId}
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={String(selectCategoryId)}
                onChange={(event: SelectChangeEvent) => handleChangeSelectCategory(Number(event.target.value))}
                label="Category"
              >
                {categories?.map((category, index) => (
                  <MenuItem key={index} value={category.id}>{category.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleConfirm} autoFocus>
          {!!data ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
