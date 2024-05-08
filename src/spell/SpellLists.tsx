import { Spell } from "../model/spell";
import React, { useEffect, useState } from "react";
import { Divider, Typography } from "@mui/material";
import SpellDetailComponent from "./SpellCardDetail";
import SkeletonCard from "../reusableComponent/SkeletonCard";
import CommonSpellCard from "../reusableComponent/CommonSpellCard";
import { useGetAllSpells, useGetFavouriteSpells } from "../api/spell";
import ErrorBoundary, { TYPE } from "../error/ErrorBoundary";

function SpellLists({ value }: { value: string }) {
  const { data, isPending: isAllSpellsPending, isError } = useGetAllSpells();

  const { data: favouriteSpellsList } = useGetFavouriteSpells();

  const [spellIndexToOpenDialog, setStoreSpellIndexToOpenDialog] =
    React.useState<string>("");

  const [filteredSpellByName, setFilteredSpellByName] = useState<Spell[]>([]);

  useEffect(() => {
    if (data) {
      const filteredResponse = data.results.filter((data) => {
        return data.index.startsWith(value.toLowerCase());
      });
      setFilteredSpellByName(filteredResponse);
    }
  }, [data, value]);

  const handleClickOpen = (spellId: string) => {
    setStoreSpellIndexToOpenDialog(spellId);
  };

  const handleClose = () => {
    setStoreSpellIndexToOpenDialog("");
  };

  if (isAllSpellsPending) {
    return <SkeletonCard />;
  }

  if (isError) {
    return <ErrorBoundary type={TYPE.INTERNAL_SERVER} />;
  }

  return (
    <>
      {filteredSpellByName.length === 0 && !isAllSpellsPending && (
        <ErrorBoundary fallback="No Data Available!" type={TYPE.NOT_FOUND} />
      )}

      <CommonSpellCard
        handleClickOpen={handleClickOpen}
        spells={filteredSpellByName}
      />

      {favouriteSpellsList && (
        <>
          <Divider>
            <Typography variant="h1">Favourite Card</Typography>
          </Divider>
          <CommonSpellCard
            handleClickOpen={handleClickOpen}
            spells={favouriteSpellsList}
          />
        </>
      )}

      {spellIndexToOpenDialog && (
        <SpellDetailComponent
          spellIndexToOpenDialog={spellIndexToOpenDialog}
          handleClose={handleClose}
        />
      )}
    </>
  );
}

export default SpellLists;
