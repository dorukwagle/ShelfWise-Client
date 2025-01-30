import { useQuery, useQueryClient } from "@tanstack/react-query";
import InfoModel from "./InfoModel";
import { NET_ERR_KEY } from "../entities/constants";


const NetErrorDialog = () => {
    const query = useQueryClient();
    const {data} = useQuery<boolean>({ 
        queryKey: NET_ERR_KEY,
        queryFn: () => Boolean(query.getQueryData(NET_ERR_KEY)),
        refetchInterval: 5
    });
    const dt = query.getQueryData(NET_ERR_KEY);
    console.log(dt, Boolean(dt));
    return (
        <InfoModel
            title="No Internet Connection"
            body="Network Error. Please check your internet connection and try again."
            show={Boolean(data)}
            buttonText={{ yes: "Reload", no: "Cancel" }}
            onYes={() => window.location.reload()}
            onNo={() => query.invalidateQueries({queryKey: NET_ERR_KEY})}
        />
    );
};

export default NetErrorDialog;
