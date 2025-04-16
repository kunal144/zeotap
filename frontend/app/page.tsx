"use client";
import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { addToast, Button, Card, CardBody, Form, Input } from "@heroui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { resolve } from "path";
import SelectiobBox from "./comp/selectionBox";

export default function Home() {
  const [config, setConfig] = useState<any>();
  const [table, setTable] = useState<any>();
  const [column, setColumn] = useState<any>();

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log(data);

    setConfig(data);
  };

  const getClient = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/ingest/clickhouse-connection",
        {
          config,
        }
      );
      addToast({
        title: "Connection Successful",
        color: "success",
      });
      console.log(response);
    } catch (error) {
      addToast({
        title: "Connection Failed",
        color: "danger",
      });
      console.log(error);
    }
  };

  const getColumns = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/ingest/clickhouse-schema",
        {
          config,
        }
      );
      addToast({
        title: "Connection Successful",
        color: "success",
      });
      setTable(response.data.tables);
      console.log(response);
    } catch (error) {
      addToast({
        title: "Something Went Wrong",
        color: "danger",
      });
      console.log(error);
    }
  };

  const getColumn = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/ingest/clickhouse-schema",
        {
          config,
        }
      );
      addToast({
        title: "Connection Successful",
        color: "success",
      });
      setTable(response.data.tables);
      console.log(response);
    } catch (error) {
      addToast({
        title: "Something Went Wrong",
        color: "danger",
      });
      console.log(error);
    }
  };

  useEffect(() => {
    if (config) {
      getClient();
    }
  }, [config]);

  return (
    <div className=" flex w-full  justify-around">
      {/* <Card className="flex flex-grow  max-w-[400px] ">
        <CardBody className="flex self-center  ">
          <Form className="w-full max-w-xs " onSubmit={onSubmit}>
            <Input
              isRequired
              errorMessage="Please enter a valid host"
              label="Host"
              labelPlacement="outside"
              name="host"
              placeholder="Enter your Host"
              type="text"
            />
            <Input
              isRequired
              errorMessage="Please enter a valid port"
              label="Port"
              labelPlacement="outside"
              name="port"
              placeholder="Enter your port"
              type="number"
            />
            <Input
              isRequired
              errorMessage="Please enter a valid user"
              label="User"
              labelPlacement="outside"
              name="user"
              placeholder="Enter your Username"
              type="text"
            />
            <Input
              isRequired
              errorMessage="Please enter a valid database"
              label="Database"
              labelPlacement="outside"
              name="database"
              placeholder="Enter your port"
              type="text"
            />
            <Input
              isRequired
              errorMessage="Please enter a valid Token"
              label="JWT Token"
              labelPlacement="outside"
              name="jwtToken"
              placeholder="Enter your JWT TOKEN"
              type="text"
            />
            <Button type="submit" variant="bordered">
              Connect
            </Button>
          </Form>
        </CardBody>
      </Card> */}
      <Card className="flex flex-grow  max-w-[400px] ">
        <CardBody className="flex self-center  ">
          <Form className="w-full max-w-xs " onSubmit={onSubmit}>
            <Input
              isRequired
              errorMessage="Please enter a valid host"
              label="Host"
              labelPlacement="outside"
              name="host"
              placeholder="Enter your Host"
              type="text"
            />
            <Input
              isRequired
              errorMessage="Please enter a valid port"
              label="Port"
              labelPlacement="outside"
              name="port"
              placeholder="Enter your port"
              type="number"
            />
            <Input
              isRequired
              errorMessage="Please enter a valid user"
              label="User"
              labelPlacement="outside"
              name="user"
              placeholder="Enter your Username"
              type="text"
            />
            <Input
              isRequired
              errorMessage="Please enter a valid database"
              label="Database"
              labelPlacement="outside"
              name="database"
              placeholder="Enter your port"
              type="text"
            />
            <Input
              isRequired
              errorMessage="Please enter a valid Token"
              label="JWT Token"
              labelPlacement="outside"
              name="token"
              placeholder="Enter your JWT TOKEN"
              type="text"
            />
            <div className="flex gap-4">
              <Button type="submit" variant="bordered">
                Connect
              </Button>
              <Button onPress={getColumns} variant="bordered">
                Get Tables
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
      <div>
        {table && <SelectiobBox mode="single" arr={table} />}
        <Button variant="bordered">Get Columns</Button>
      </div>
    </div>
  );
}
