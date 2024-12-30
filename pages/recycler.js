import React, { Component } from "react";
import {
  Button,
  Message,
  Form,
  Container,
  Grid,
  Input,
  Segment,
  Header
} from "semantic-ui-react";
import web3 from "../ethereum/web3";
import cpuContract from "../ethereum/cpuProduction";
import { withRouter } from "next/router";
import dynamic from "next/dynamic";
import AllCPUs from "../components/CPUsTable"
// 1) Import QrScanner
import QrScanner from "qr-scanner";

// 2) Dynamically import react-qr-reader (camera-based)
const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false });

class TechnicianPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cpuAddress: "",
      components: [],
      loading: false,
      loadingButton: null,
      componentDetails: {
        Processor: "",
        RAM: "",
        "Hard Disk": "",
        Motherboard: "",
        PSU: "",
      },
      errorMessage: "",
      successMessage: "",
      isAuthenticated: false,
      userRole: null,
      userAddress: "",
      qrScanned: false,
      cpuModel: "",
      cpuSerial: "",
      cpuStatus: "",
    };
  }

  componentDidMount = async () => {
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      const userAddress = localStorage.getItem("userAddress");
      const accounts = await web3.eth.getAccounts();

      // Basic checks
      if (!token || !role || !userAddress) {
        this.props.router.push("/login");
        return;
      }

      if (role !== "technician") {
        this.props.router.push("/unauthorized");
        return;
      }

      if (!accounts || !accounts[0]) {
        this.props.router.push("/connect-wallet");
        return;
      }

      if (accounts[0].toLowerCase() !== userAddress.toLowerCase()) {
        this.props.router.push("/connect-wallet");
        return;
      }

      this.setState({
        isAuthenticated: true,
        userRole: role,
        userAddress: userAddress,
      });
    } catch (error) {
      this.props.router.push("/unauthorized");
    }
  };

  /**
   * Handle scanning from the camera (react-qr-reader onScan callback)
   */
  handleScan = async (data) => {
    if (data) {
      await this.fetchCPUDetails(data.trim());
    }
  };

  handleError = (err) => {
    this.setState({ errorMessage: err.message });
  };

  /**
   * Handle file upload for a QR code image.
   */
  handleFileUpload = async (event) => {
    try {
      const file = event.target.files[0];
      if (!file) return;

      // 3) Scan the uploaded image with QrScanner
      const result = await QrScanner.scanImage(file, {
        returnDetailedScanResult: false,
      });
      console.log("QR code content from uploaded image:", result);

      // If successful, fetch CPU details
      if (result) {
        await this.fetchCPUDetails(result.data.trim());
      }
    } catch (error) {
      console.error("Error scanning uploaded image:", error);
      this.setState({
        errorMessage: "Could not detect a valid QR code in the image.",
      });
    }
  };

  /**
   * Common method to fetch CPU details from the contract
   * once we have the QR code data (CPU address).
   */
  fetchCPUDetails = async (cpuAddress) => {
    try {
      this.setState({ cpuAddress, qrScanned: true });

      const cpuDetails = await cpuContract.methods.getCPU(cpuAddress).call();
      console.log("Fetched CPU Details:", cpuDetails);

      if (cpuDetails) {
        this.setState({
          cpuModel: cpuDetails.modelName,
          cpuSerial: cpuDetails.serialNumber,
          cpuStatus: cpuDetails.status,
          components: cpuDetails.components,
        });
      } else {
        console.log("No CPU details found or invalid data format.");
      }
    } catch (err) {
      console.error("Error fetching CPU details:", err);
      this.setState({ errorMessage: "Error fetching CPU details." });
    }
  };

  // Update the text in components array
  handleComponentDetailsChange = (index, value) => {
    this.setState((prevState) => {
      const updatedComponents = [...prevState.components];
      updatedComponents[index] = {
        ...updatedComponents[index],
        details: value,
      };
      return { components: updatedComponents };
    });
  };

  // Update a component in the contract
  updateComponentDetails = async (componentIndex) => {
    const { cpuAddress, components } = this.state;
    const updatedValue = components[componentIndex].details;
    const updatedComponentType = components[componentIndex].componentType;

    try {
      this.setState({
        loadingButton: `update-${componentIndex}`,
        errorMessage: "",
        successMessage: "",
      });
      const accounts = await web3.eth.getAccounts();

      await cpuContract.methods
        .updateComponent(cpuAddress, componentIndex, "Working", updatedValue)
        .send({ from: accounts[0] });

      // Re-fetch CPU details so state is up to date
      const cpuDetails = await cpuContract.methods.getCPU(cpuAddress).call();
      if (cpuDetails) {
        this.setState({
          cpuStatus: cpuDetails.status,
          components: cpuDetails.components,
        });
      }

      this.setState((prevState) => ({
        components: prevState.components.map((comp, idx) =>
          idx === componentIndex ? { ...comp, status: "Working" } : comp
        ),
        successMessage: `${updatedComponentType} updated successfully!`,
      }));
    } catch (err) {
      this.setState({ errorMessage: "Error updating component." });
    } finally {
      this.setState({ loadingButton: null });
    }
  };

  // Remove a component
  removeComponent = async (componentIndex) => {
    const { cpuAddress, components } = this.state;
    const removedComponentType = components[componentIndex].componentType;

    try {
      this.setState({
        loadingButton: `remove-${componentIndex}`,
        errorMessage: "",
        successMessage: "",
      });
      const accounts = await web3.eth.getAccounts();

      await cpuContract.methods
        .removeComponent(cpuAddress, componentIndex)
        .send({ from: accounts[0] });

      // Re-fetch CPU details
      const cpuDetails = await cpuContract.methods.getCPU(cpuAddress).call();
      if (cpuDetails) {
        this.setState({
          cpuStatus: cpuDetails.status,
          components: cpuDetails.components,
        });
      }

      this.setState((prevState) => ({
        components: prevState.components.map((comp, idx) =>
          idx === componentIndex ? { ...comp, status: "Removed" } : comp
        ),
        successMessage: `${removedComponentType} removed successfully!`,
      }));
    } catch (err) {
      this.setState({ errorMessage: "Error removing component." });
    } finally {
      this.setState({ loadingButton: null });
    }
  };

  // Helper to render the status icon
  renderStatusIcon = (status) => {
    switch (status) {
      case "Working":
        return "Working";
      case "Removed":
        return "Removed";
      default:
        return "Unknown";
    }
  };

  render() {
    const {
      components,
      qrScanned,
      cpuModel,
      cpuSerial,
      cpuStatus,
      errorMessage,
      successMessage,
      loadingButton,
    } = this.state;

    return (
      <Container>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.css"
        />

        {/* Page Heading */}
        <Header as="h1" textAlign="center" style={{ marginTop: "1em" }}>
          Technician - Update/Remove Components
        </Header>

        <Grid centered style={{ marginTop: "2em" }}>
          <Grid.Column width="100%">
            {/* If not scanned yet, show QR Reader + Upload option */}
            {!qrScanned ? (
              <Segment>
                <Grid stackable columns={2}>
                  <Grid.Row>
                    {/* LEFT COLUMN: QR scanning + upload */}
                    <Grid.Column>
                      <Header as="h2" style={{ marginTop: "10px" }} textAlign="center">
                        Scan or Upload QR Code
                      </Header>

                      {/* 1) Camera-based scanning */}
                      <QrReader
                        delay={300}
                        style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}
                        onScan={this.handleScan}
                        onError={this.handleError}
                      />

                      <div style={{ marginTop: "1.5em", textAlign: "center" }}>
                        <Button as="label" htmlFor="file" type="button" color="green"
                          style={{
                        	backgroundColor: "#21ba45", // the 'green' shade
                        	color: "#fff"               // white text
                          }}
                        >
                          Upload QR Image
                        </Button>
                        <input
                          type="file"
                          id="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={this.handleFileUpload}
                        />
                      </div>
                    </Grid.Column>

                    {/* RIGHT COLUMN: AllCPUs component */}
                    <Grid.Column>
                      {/* <Header as="h2" textAlign="center" style={{ marginTop: "10px" }}>
					  All CPUs
					</Header> */}
                      <AllCPUs />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>

            ) : (
              <>
                {/* Top row: Model, Serial, Status */}
                <Form>
                  <Form.Group widths="equal">
                    <Form.Field>
                      <label>Model</label>
                      <Input readOnly placeholder="Model" value={cpuModel} />
                    </Form.Field>
                    <Form.Field>
                      <label>Serial</label>
                      <Input readOnly placeholder="Serial" value={cpuSerial} />
                    </Form.Field>
                    <Form.Field>
                      <label>Status</label>
                      <Input readOnly placeholder="Status" value={cpuStatus} />
                    </Form.Field>
                  </Form.Group>
                </Form>

                <div style={{width: "100%"}}>

                  <Header
                    as="h2"
                    textAlign="center"
                    style={{ marginTop: "10px", marginBottom: "10px" }}
                  >
                    Components
                  </Header>

                  <Form
                    error={!!errorMessage}
                    success={!!successMessage}
                    style={{ marginTop: "1em", width: "100%" }}
                  >
                    {components.map((component, idx) => (
                      <Form.Group key={idx} style={{display: "flex", alignItems: "flex-end", justifyContent: "space-between"}}>
                        {/* Label & Input */}
                        <Form.Field width={"100%"} style={{flex: "1"}}>
                          <label>{component.componentType}</label>
                          <Input
                            placeholder={`Enter ${component.componentType} Details`}
                            value={component.details}
                            onChange={(e) =>
                              this.handleComponentDetailsChange(
                                idx,
                                e.target.value
                              )
                            }
                            // width="50%"
                          />
                        </Form.Field>

                        {/* Update / Remove / Status */}
                        <Form.Field
                          style={{
                            display: "flex",
                            alignItems: "flex-end",
                            gap: "0.5em",
                          }}
                        >
                          <Button
                            color="green"
                            onClick={() => this.updateComponentDetails(idx)}
                            loading={loadingButton === `update-${idx}`}
                          >
                            Update
                          </Button>

                          <Button
                            color="red"
                            disabled={component.status === "Removed"}
                            onClick={() => this.removeComponent(idx)}
                            loading={loadingButton === `remove-${idx}`}
                          >
                            Remove
                          </Button>

                          <Button color="orange" style={{ cursor: "default" }}>
                            {this.renderStatusIcon(component.status)}
                          </Button>
                        </Form.Field>
                      </Form.Group>
                    ))}

                    <Message
                      error
                      header="Error"
                      content={errorMessage}
                    />
                    <Message
                      success
                      header="Success"
                      content={successMessage}
                    />
                  </Form>
                </div>
              </>
            )}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default withRouter(TechnicianPage);
