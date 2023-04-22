import React from "react";
import { FlexPlugin } from "@twilio/flex-plugin";
import { Tab } from "@twilio/flex-ui";

import { CustomizationProvider } from "@twilio-paste/core/customization";

import CRM from "./components/CRM";
import CustomTab from "./components/CustomTab";

const PLUGIN_NAME = "FlexSamplesPlugin";

export default class FlexSamplesPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   */
  async init(flex, manager) {
    // Use Case 1: Use Twilio Paste
    flex.setProviders({
      PasteThemeProvider: CustomizationProvider,
    });

    // Use Case 2: Change Logo
    flex.MainHeader.defaultProps.logoUrl =
      "https://idreamleaguesoccerkits.com/wp-content/uploads/2017/12/barcelona-logo.png";

    // Use Case 3: Change Color Scheme
    // Color Scheme is changed in public/appConfig.js - More Details: https://www.twilio.com/docs/flex/developer/ui/overview-of-flex-ui-programmability-options#theming-flex-ui

    // Use Case 4: CRM - iFrame
    // flex.CRMContainer.defaultProps.uriCallback = (task) => {
    //   return task
    //     ? `https://www.bing.com/search?q=${task.attributes.name}`
    //     : "https://www.bing.com";
    // };

    // Use Case 5: CRM - Custom
    flex.AgentDesktopView.Panel2.Content.replace(<CRM key="test" />, {
      sortOrder: -1,
    });

    // Use Case 6: Add custom data into default Task Info Panel
    manager.strings.TaskInfoPanelContent += `\n<p>Custom Data</p>Hello World! You can access task variables as well using placeholders. Example of Task Name: {{task.attributes.name}}`;

    // Use Case 7: Add Tab
    flex.TaskCanvasTabs.Content.add(
      <Tab label="Custom" key="custom-tab-key">
        <CustomTab key="custom-tab" />
      </Tab>
    );

    // Use Case X: Force SIP call via Flex Native Dialpad
    flex.Actions.replaceAction("StartOutboundCall", (payload, original) => {
      // Default all outbound calls to external SIP interface
      /*
       * Instructions:
       * Replace "sipInterfaceIPAddress" with external SIP Interface
       */
      const sipInterfaceIPAddress = "xxx.xxx.xxxx.xxx";
      payload.destination =
        "sip:" + payload.destination + `@${sipInterfaceIPAddress}`;
      payload.callerId = "+xxxxxxxx";
      console.log("updated outbound call to:", payload);
      original(payload);
    });
  }
}
