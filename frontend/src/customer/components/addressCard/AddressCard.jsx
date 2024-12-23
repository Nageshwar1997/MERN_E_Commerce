import React from "react";

const AddressCard = ({ address }) => {
  return (
    <div className="border py-2 px-4 mb-2">
      <div>
        <p className="capitalize">
          {address?.firstName} {address?.lastName}
        </p>
        <p className="capitalize">
          {address?.address}, {address?.city}, {address?.state},{" "} {address?.zip}
        </p>
        <div className="space-y-1">
          <p>Phone Number:</p>
          <p>+91 {address?.mobileNumber?.slice(3, 13)}</p>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
