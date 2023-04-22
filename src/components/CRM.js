import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Table,
  TBody,
  Td,
  Th,
  THead,
  Tr,
  Card,
  Avatar,
  MediaBody,
  MediaFigure,
  MediaObject,
  Stack,
  SkeletonLoader,
} from "@twilio-paste/core";

import { ThumbsUpIcon } from "@twilio-paste/icons/esm/ThumbsUpIcon";
import { InformationIcon } from "@twilio-paste/icons/esm/InformationIcon";

import { withTaskContext } from "@twilio/flex-ui";

const CRM = (props) => {
  if (!props.task) {
    return null;
  }
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getDataFromCRM() {
      if (props.task) {
        const crmEndPoint = `https://mock-service-8950.twil.io/crm`;
        const crmData = await fetch(crmEndPoint);
        const crmDataJson = await crmData.json();
        setData(crmDataJson);
        setLoading(false);
      }
    }
    getDataFromCRM();
  }, []);

  if (loading)
    return (
      <Card>
        <Stack orientation={"vertical"} spacing={"space70"}>
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
        </Stack>
      </Card>
    );
  return (
    <Card>
      <Stack orientation={"vertical"} spacing={"space40"}>
        <MediaObject as="div" verticalAlign="center">
          <MediaFigure as="div" spacing="space40">
            <Avatar size="sizeIcon90" name={data.name} />
          </MediaFigure>
          <MediaBody as="div">
            <Text
              as="h2"
              variant="heading50"
              fontSize={"fontSize60"}
              fontWeight="fontWeightBold"
            >
              {data.name}
            </Text>
          </MediaBody>
        </MediaObject>
        <Table>
          <THead>
            <Tr>
              <Th>Customer Information</Th>
            </Tr>
          </THead>
          <TBody>
            <Tr>
              <Td>
                <Text as="span" display={"flex"}>
                  <InformationIcon decorative={true} about="Address" />
                  <Box marginLeft="space40">{data.address}</Box>
                </Text>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text as="span" display={"flex"}>
                  <ThumbsUpIcon decorative={true} about="Loyalty Status" />
                  <Box marginLeft="space40">{data.loyalty_status}</Box>
                </Text>
              </Td>
            </Tr>
          </TBody>
        </Table>
      </Stack>
    </Card>
  );
};

export default withTaskContext(CRM);
