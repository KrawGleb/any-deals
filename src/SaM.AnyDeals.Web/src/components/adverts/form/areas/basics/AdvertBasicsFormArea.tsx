import { Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGetCategoriesQuery } from "../../../../../features/api/extensions/categoriesApiExtension";
import { Category } from "../../../../../models/api/category";
import { SelectableItem } from "../../../../../models/selectableItem";
import ControlledInput from "../../../../common/controlledInput/ControlledInput";
import FakeSelect from "../../../../common/fakeSelect/FakeSelect";
import SelectDialog from "../../../../dialogs/select/SelectDialog";
import { AdvertBasicsFormAreaProps } from "./AdvertBasicsFormAreaProps";

export default function AdvertBasicsFormArea({
  control,
  errors,
  register,
  category,
  onCategoryChanged,
}: AdvertBasicsFormAreaProps) {
  const { data: categories } = useGetCategoriesQuery();
  const [isCategorySelectOpen, setIsCategorySelectOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >();
  const handleSelectCategoryDialogClose = (value?: SelectableItem) => {
    setIsCategorySelectOpen(false);
    setSelectedCategory(value as Category);
    onCategoryChanged(value as Category);
  };

  useEffect(() => {
    setSelectedCategory(category);
  }, [category]);

  return (
    <>
      <SelectDialog
        open={isCategorySelectOpen}
        allowCustom={true}
        onClose={handleSelectCategoryDialogClose}
        selectedValue={selectedCategory as SelectableItem}
        variants={(categories as SelectableItem[]) ?? []}
      />
      <Paper sx={{ padding: "16px" }}>
        <Typography variant="h6" className="mb-3">
          Basic information
        </Typography>
        <Stack spacing={2}>
          <ControlledInput
            control={control}
            name={"title"}
            label="Title"
            required
            error={!!errors.title}
            helperMessage={errors?.title?.message}
          />

          <FakeSelect
            required
            label="Category"
            value={selectedCategory?.name ?? ""}
            onClick={() => setIsCategorySelectOpen(true)}
            {...register!("category")}
            error={!!errors.category}
            helperText={errors?.category?.message}
          />

          <ControlledInput
            multiline
            name="description"
            control={control}
            label="Description"
            rows={4}
            error={!!errors.description}
            helperMessage={errors?.description?.message}
          />
        </Stack>
      </Paper>
    </>
  );
}
