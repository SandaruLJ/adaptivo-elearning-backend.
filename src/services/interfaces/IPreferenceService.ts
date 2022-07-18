import { IPreference } from "../../interfaces/IPreference.js";

export interface IPreferenceService {
  createPreference(request: IPreference): Promise<IPreference>;
  getAllPreference(): Promise<IPreference[]>;
  getPreferenceById(id: string): Promise<IPreference | Object>;
  updatePreference(id: string, product: IPreference): Promise<IPreference | Object>;
  deletePreference(id: string): Promise<IPreference | Object>;
}
