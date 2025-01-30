import React from "react";
import CardForm from "../../Components/Form/CardForm";
import Heading from "../../Components/Uitily/Heading";

const ReceivingDeliveringSamplesFormPage = () => {
  return (
    <div className="ml-[120px] mx-[60px] py-4 ">
      <Heading title="إستمارة إستلام وتسليم العينات" subtitle="" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <CardForm name="قضية 1" date="30/11/2023" link="/form1Details:id" />
        <CardForm name="قضية 2" date="30/11/2023" link="/form1Details:id" />
        <CardForm name="قضية 3" date="30/11/2023" link="/form1Details:id" />
        <CardForm name="قضية 4" date="30/11/2023" link="/form1Details:id" />
        <CardForm name="قضية 5" date="30/11/2023" link="/form1Details:id" />
        <CardForm name="قضية 6" date="30/11/2023" link="/form1Details:id" />
      </div>
    </div>
  );
};

export default ReceivingDeliveringSamplesFormPage;
