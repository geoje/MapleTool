import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Union from "../types/union/union";
import UnionService from "../service/union/union";
import { UnionBasic } from "../types/union/unionBasic";
import { UnionArtifact } from "../types/union/unionArtifact";
import { UnionRaider } from "../types/union/unionRaider";

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
      UnionService.saveBasic(action.payload);
    },
    setUnionArtifact(state, action: PayloadAction<UnionArtifact | undefined>) {
      state.artifact = action.payload;
      UnionService.saveArtifact(action.payload);
    },
    setUnionRaider(state, action: PayloadAction<UnionRaider | undefined>) {
      state.raider = action.payload;
      UnionService.saveRaider(action.payload);
    },
  },
});

export const { setUnionBasic, setUnionArtifact, setUnionRaider } =
  unionSlice.actions;
export default unionSlice.reducer;
