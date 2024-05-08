import { Spell } from "../model/spell";
import SpellCard from "../spell/SpellCard";
import { Grid } from "../styles/styledComponent/styled";

export default function CommonSpellCard({
  spells,
  handleClickOpen,
}: {
  spells: Spell[];
  handleClickOpen: (spellId: string) => void;
}) {
  return (
    <Grid>
      {spells.map(({ index: spellId }, index) => {
        return (
          <SpellCard
            index={spellId}
            key={`${spellId}_${index}`}
            handleClickOpen={handleClickOpen}
          />
        );
      })}
    </Grid>
  );
}
