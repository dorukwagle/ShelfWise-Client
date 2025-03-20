import APIClient from "../../../services/apiClient";
import { z } from "zod";

export const FilterParams = z.object({
  id: z.string().optional(), 
  seed: z.string().optional(), 
  page: z.coerce.number().min(1).optional(),
  pageSize: z.coerce.number().min(3).optional(),
  status: z.string().optional(), 
});

export type FilterParamsType = z.infer<typeof FilterParams>;

export default FilterParams;

export const renewalService = new APIClient<any, any>("bookflow/renewals");


export const cancelRenewal = async (renewalId: string) => {
  try {
    const response = await renewalService.delete(`${renewalId}`);
    return response;
  } catch (error) {
    throw new Error("Failed to cancel renewal");
  }
};

export const approveRenewal = async (renewalId: string) => {
  try {
    const response = await renewalService.put(`approve/${renewalId}`);
    return response;
  } catch (error) {
    throw new Error("Failed to approve renewal");
  }
};

export const rejectRenewal = async (renewalId: string) => {
  try {
    const response = await renewalService.delete(`reject/${renewalId}`);
    return response;
  } catch (error) {
    throw new Error("Failed to reject renewal");
  }
};

export const requestRenewal = async (issueId: string) => {
    try {
      const response = await renewalService.setSubroute(`/${issueId}`).post();
      return response;
    } catch (error) {
      throw new Error("Failed to request renewal");
    }
  };