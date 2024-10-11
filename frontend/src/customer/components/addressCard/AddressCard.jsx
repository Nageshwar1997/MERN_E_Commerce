import React from "react";

const AddressCard = ({ address }) => {
  return (
    <div>
      <div>
        <p className="capitalize">
          {address?.firstName} {address?.lastName}
        </p>
        <p className="capitalize">
          {address?.address}, {address?.city}, {address?.state},{" "}
          {address?.country}, {address?.zip}
        </p>
        <div className="space-y-1">
          <p>Phone Number:</p>
          <p>{address?.mobileNumber}</p>
          <p>{address?.alternateMobileNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
