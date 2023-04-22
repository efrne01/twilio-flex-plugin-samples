import React, { useEffect, useState } from "react";
import {
  Card,
  Heading,
  Paragraph,
  Anchor,
  Stack,
  SkeletonLoader,
} from "@twilio-paste/core";

import { ThumbsUpIcon } from "@twilio-paste/icons/esm/ThumbsUpIcon";
import { InformationIcon } from "@twilio-paste/icons/esm/InformationIcon";

import { withTaskContext } from "@twilio/flex-ui";

const CustomTab = (props) => {
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
    <Stack orientation="vertical">
      <Card padding="space120">
        <Heading as="h2" variant="heading20">
          {data.name}
        </Heading>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          in mauris sit amet mi cursus scelerisque. Phasellus non diam id elit
          facilisis lobortis et hendrerit enim. Cras et leo nec tellus bibendum
          fermentum et at tellus. Vestibulum et malesuada nibh. Donec laoreet
          finibus quam, et luctus velit mattis id. Nullam aliquet sem ac nisi
          hendrerit, a bibendum felis iaculis. Sed efficitur, ligula et maximus
          pellentesque, lorem urna fringilla urna, vitae mollis ex eros ut orci.
          Maecenas blandit sem at commodo tempus. Duis imperdiet, nibh in
          tincidunt molestie, metus diam tempus dui, vel consectetur nisl lorem
          non enim. Quisque a mattis leo. Nullam dictum lacus ac justo
          sollicitudin, quis tempus lorem auctor.
        </Paragraph>
      </Card>
    </Stack>
  );
};

export default withTaskContext(CustomTab);
