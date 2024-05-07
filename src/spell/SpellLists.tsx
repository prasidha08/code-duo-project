import React, { useEffect, useState } from "react";
import { useGetAllSpells, useGetFavouriteSpells } from "../api/spell";
import { Spell } from "../model/spell";
import SpellCard from "./SpellDetails";
import SpellDetailComponent from "./SpellCardDetail";
import { Typography } from "@mui/material";

function SpellLists({ value }: { value: string }) {
  const { data } = useGetAllSpells();
  const { data: favouriteSpellsList, isPending } = useGetFavouriteSpells();

  const [spellIndexToOpenDialog, setStoreSpellIndexToOpenDialog] =
    React.useState<string>("");

  const [filteredSpellByName, setFilteredSpellByName] = useState<Spell[]>([]);

  const handleClickOpen = (spellId: string) => {
    setStoreSpellIndexToOpenDialog(spellId);
  };

  const handleClose = () => {
    setStoreSpellIndexToOpenDialog("");
  };

  useEffect(() => {
    if (data) {
      const filteredResponse = data.results.filter((data) => {
        return data.index.startsWith(value.toLowerCase());
      });
      setFilteredSpellByName(filteredResponse);
    }
  }, [data, value]);

  return (
    <>
      {filteredSpellByName.length === 0 && (
        <Typography align="center" variant="h1">
          No data found !
        </Typography>
      )}
      
      <CommonSpellCard
        handleClickOpen={handleClickOpen}
        spells={filteredSpellByName}
      />


      {favouriteSpellsList && (
        <>
          <Typography variant="h1">Favourite Card</Typography>
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

function CommonSpellCard({
  spells,
  handleClickOpen,
}: {
  spells: Spell[];
  handleClickOpen: (spellId: string) => void;
}) {
  return (
    <div
      style={{
        display: "grid",
        flexWrap: "wrap",
        gap: 30,
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      }}
    >
      {spells.map(({ index: spellId }, index) => {
        return (
          <SpellCard
            index={spellId}
            key={`${spellId}_${index}`}
            handleClickOpen={handleClickOpen}
          />
        );
      })}
    </div>
  );
}
