import ArrowBack from "@mui/icons-material/ArrowBack";
import {
  Box,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import FakeSelect from "../../../components/common/fake-select/FakeSelect";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./NewAdvert.scss";
import Input from "../../../components/common/Input";
import SelectDialog from "../../../components/common/select-dialog/SelectDialog";

const countries = [1, 2, 3, 4, 5, 6].map((n) => `Country-${n}`);
const cities = [1, 2, 3, 4, 5, 6].map((n) => `City-${n}`);
const categories = [1, 2, 3, 4, 5, 6].map((n) => `Category-${n}`);

export default function NewAdvert() {
  const [isCountrySelectOpen, setIsCountrySelectOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>();
  const handleSelectCountryDialogClose = (value: string | undefined) => {
    setIsCountrySelectOpen(false);
    setSelectedCountry(value);
  };

  const [isCitySelectOpen, setIsCitySelectOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | undefined>();
  const handleSelectCityDialogClose = (value?: string) => {
    setIsCitySelectOpen(false);
    setSelectedCity(value);
  };

  const [isCategorySelectOpen, setIsCategorySelectOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();
  const handleSelectCategoryDialogClose = (value: string | undefined) => {
    setIsCategorySelectOpen(false);
    setSelectedCategory(value);
  };

  const [group, setGroup] = useState("");
  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value as string);
    setGroup(event.target.value as string);
  };

  return (
    <Box>
      <SelectDialog
        open={isCountrySelectOpen}
        onClose={handleSelectCountryDialogClose}
        selectedValue={selectedCountry}
        variants={countries}
      />
      <SelectDialog
        open={isCitySelectOpen}
        onClose={handleSelectCityDialogClose}
        selectedValue={selectedCity}
        variants={cities}
      />
      <SelectDialog
        open={isCategorySelectOpen}
        onClose={handleSelectCategoryDialogClose}
        selectedValue={selectedCategory}
        variants={categories}
      />

      <div className="new">
        <div className="new__container">
          <div className="back-line">
            <div className="line">
              <div className="row">
                <ArrowBack fontSize="medium" />
              </div>
              <Typography className="row nav-text prevent-select">
                Back
              </Typography>
            </div>
          </div>
          <form className="form">
            <Box className="title">
              <Typography variant="h5" className="title__text">
                Basic information
              </Typography>
            </Box>

            <div className="form__group">
              <Typography variant="h5">Advertisement's group</Typography>
              <Typography variant="subtitle1" className="mb-3" color="gray">
                In which section would you like to place your ad?
              </Typography>
              <Input
                value={group}
                onChange={handleChange}
                label="Group"
                select
                required
              >
                <MenuItem key={10} value="10">
                  Services nearby
                </MenuItem>
                <MenuItem key={20} value="20">
                  Online services
                </MenuItem>
                <MenuItem key={30} value="30">
                  Events and places
                </MenuItem>
              </Input>
            </div>

            <div className="form__goal">
              <FormControl>
                <Typography variant="h5">Advertisement's goal</Typography>
                <RadioGroup row>
                  <FormControlLabel
                    value="offer"
                    control={<Radio />}
                    label="I suggest"
                  />
                  <FormControlLabel
                    value="search"
                    control={<Radio />}
                    label="I'm looking for"
                  />
                </RadioGroup>
              </FormControl>
            </div>

            <div className="form__goal mb-4">
              <FormControl>
                <Typography variant="h5">My interest</Typography>
                <RadioGroup row>
                  <FormControlLabel
                    value="commercial"
                    control={<Radio />}
                    label="Commercial"
                  />
                  <FormControlLabel
                    value="social"
                    control={<Radio />}
                    label="Social"
                  />
                </RadioGroup>
              </FormControl>
            </div>

            <Stack spacing={2} className="mb-5">
              <Input label="Title" required />
              <FakeSelect
                label={selectedCategory ?? "Category"}
                required
                onClick={() => setIsCategorySelectOpen(true)}
              />
              <Input label="Description" required multiline rows={4} />
            </Stack>

            <div className="form__location mb-5">
              <Typography variant="h5" className="mb-3">
                Advertisement's location
              </Typography>
              <Stack direction="row" spacing={2}>
                <FakeSelect
                  label={selectedCountry ?? "Country"}
                  required
                  onClick={() => setIsCountrySelectOpen(true)}
                />
                <FakeSelect
                  label={selectedCity ?? "City"}
                  required
                  onClick={() => setIsCitySelectOpen(true)}
                />
              </Stack>
            </div>

            <div className="form__contacts mb-5">
              <Typography variant="h5">Contacts</Typography>
              <Typography variant="subtitle1" className="mb-3" color="gray">
                At least one way to contact you: mail, phone, links to websites,
                social networks, messenger accounts, etc.
              </Typography>

              <Stack spacing={3}>
                <Stack direction="row" spacing={3}>
                  <Input label="Name" required />
                  <Input label="Email" />
                </Stack>

                <Stack direction="row" spacing={3}>
                  <Input label="Phone number" />
                  <Input label="Address" />
                </Stack>

                <Stack direction="row" spacing={3}>
                  <Input label="Facebook" />
                  <Input label="VK" />
                </Stack>

                <Stack direction="row" spacing={3}>
                  <Input label="Instagram" />
                  <Input label="LinkedIn" />
                </Stack>

                <Stack direction="row" spacing={3}>
                  <Input label="Telegram" />
                  <Input label="WhatsApp" />
                </Stack>
              </Stack>
            </div>

            <div className="form__docs mb-5">
              <Typography variant="h5">Documents, images</Typography>
              <Typography variant="subtitle1" className="mb-3" color="gray">
                The first file will be visible on the announcement card
              </Typography>
            </div>

            <div className="form__actions">
              <Button variant="contained" sx={{ marginRight: "16px" }}>
                Cancel
              </Button>
              <Button variant="contained" endIcon={<ArrowForwardIosIcon />}>
                Create and publish
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Box>
  );
}
