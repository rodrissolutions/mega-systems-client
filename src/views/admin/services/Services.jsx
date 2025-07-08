import { Text } from "react-native";
import AdminLayout from "layouts/AdminLayout";
import { useEffect } from "react";
import { serviceAPI } from "../../../api/index.api";

const Services = () => {
  const getAllServices = () => {
    serviceAPI
      .getServices()
      .then((res) => {})
      .catch((err) => {})
      .finally(() => {});
  };

  useEffect(() => {
    getAllServices();
  }, []);

  return (
    <AdminLayout>
      <Text>Services</Text>
    </AdminLayout>
  );
};

export default Services;
