import { UnionArtifact } from "./unionArtifact";
import { UnionBasic } from "./unionBasic";
import { UnionRaider } from "./unionRaider";

export default interface Union {
  basic?: UnionBasic;
  artifact?: UnionArtifact;
  raider?: UnionRaider;
}
