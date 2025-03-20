import React from "react";
import useIssuance from "../hooks/useIssuance";
import { IssuanceTable } from "../components/IssuanceTable";
import RenewalList from "../../renewal/component/renewalList";

const IssuancePage: React.FC = () => {
    const { data, isLoading, isError, error } = useIssuance({});

    if (isError) return <p>Error: {error?.message}</p>;
    if (isLoading) return <p>Loading...</p>;

    const { data: issuances, info } = data || { data: [], info: { hasNextPage: false, itemsCount: 0 } };

    return (
        <div>
            <h1>Issuance List</h1>
            <IssuanceTable issuances={issuances} loading={isLoading} />
            <p>Total Items: {info.itemsCount}</p>
            {info.hasNextPage && <button onClick={() => console.log("Load more...")}>Load More</button>}

            <RenewalList />
        </div>
    );
};

export default IssuancePage;