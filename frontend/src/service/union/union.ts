import axios from "axios";
import { UnionBasic } from "../../dto/union/unionBasic";
import { UnionArtifact } from "../../dto/union/unionArtifact";
import { UnionRaider } from "../../dto/union/unionRaider";

const KEY_BASIC = "union-basic";
const KEY_ARTIFACT = "union-artifact";
const KEY_RAIDER = "union-radier";

export default abstract class UnionService {
  static requestBasic(name: string): Promise<UnionBasic> {
    return axios.get(`/api/union/basic?name=${name}`).then((res) => res.data);
  }
  static requestArtifact(name: string): Promise<UnionArtifact> {
    return axios
      .get(`/api/union/artifact?name=${name}`)
      .then((res) => res.data);
  }
  static requestRaider(name: string): Promise<UnionRaider> {
    return axios.get(`/api/union/raider?name=${name}`).then((res) => res.data);
  }

  static loadBasic(): UnionBasic | null {
    return JSON.parse(localStorage.getItem(KEY_BASIC) ?? "null");
  }
  static loadArtifact(): UnionArtifact | null {
    return JSON.parse(localStorage.getItem(KEY_ARTIFACT) ?? "null");
  }
  static loadRaider(): UnionRaider | null {
    return JSON.parse(localStorage.getItem(KEY_RAIDER) ?? "null");
  }

  static saveBasic(basic?: UnionBasic) {
    if (!basic) {
      localStorage.removeItem(KEY_BASIC);
      return;
    }
    localStorage.setItem(KEY_BASIC, JSON.stringify(basic));
  }
  static saveArtifact(artifact?: UnionArtifact) {
    if (!artifact) {
      localStorage.removeItem(KEY_ARTIFACT);
      return;
    }
    localStorage.setItem(KEY_ARTIFACT, JSON.stringify(artifact));
  }
  static saveRaider(radier?: UnionRaider) {
    if (!radier) {
      localStorage.removeItem(KEY_BASIC);
      return;
    }
    localStorage.setItem(KEY_RAIDER, JSON.stringify(radier));
  }
}
