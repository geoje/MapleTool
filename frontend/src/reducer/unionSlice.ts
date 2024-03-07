import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Union from "../domain/union/union";
import UnionService from "../service/union/union";
import { UnionBasic } from "../domain/union/unionBasic";
import { UnionArtifact } from "../domain/union/unionArtifact";
import { UnionRaider } from "../domain/union/unionRaider";

const unionSlice = createSlice({
  name: "union",
  initialState: <Union>{
    basic: UnionService.loadBasic(),
    artifact: UnionService.loadArtifact(),
    raider: UnionService.loadRaider(),
  },
  reducers: {
    setUnionBasic(state, action: PayloadAction<UnionBasic | undefined>) {
      state.basic = action.payload;
      if (action.payload) UnionService.saveBasic(action.payload);
    },
    setUnionArtifact(state, action: PayloadAction<UnionArtifact | undefined>) {
      state.artifact = action.payload;
      if (action.payload) UnionService.saveArtifact(action.payload);
    },
    setUnionRaider(state, action: PayloadAction<UnionRaider | undefined>) {
      state.raider = action.payload;
      if (action.payload) UnionService.saveRaider(action.payload);
    },
  },
});

export const { setUnionBasic, setUnionArtifact, setUnionRaider } =
  unionSlice.actions;
export default unionSlice.reducer;
