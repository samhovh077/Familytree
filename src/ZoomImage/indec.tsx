/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Flex, Image, Modal } from "antd";
import React from "react";
import ReactAvatarEditor from "react-avatar-editor";
const scale = 1;
const show = false;
class TreeModal extends React.Component<any> {
  editor: any;
  state: any;
  constructor(props: any) {
    super(props as any);
    this.state = {
      image: "",
      allowZoomOut: false,
      position: { x: 0.5, y: 0.5 },
      scale: 1,
      rotate: 0,
      borderRadius: 50,
      preview: null,
      width: 330,
      height: 330,
      show: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleNewImage = (e: { target: { files: File[] } }) => {
    this.setState({ image: e.target.files[0] });
  };
  handleScale = (e: { target: { value: string } }) => {
    const scale = parseFloat(e.target.value);
    this.setState({ scale });
  };
  handlePositionChange = (position: string) => {
    this.setState({ position });
  };

  setEditorRef = (editor: any) => (this.editor = editor);

  async handleSubmit() {
    if (this.editor) {
      const img = this.editor.getImageScaledToCanvas().toDataURL();
      console.log(img);
    }

    this.props.setOpen(false);
    this.setState({ show });
    this.setState({ scale });
  }

  render() {
    return (
      <Flex>
        <Modal
          width={600}
          footer={null}
          open={this.props.open}
          onCancel={() => {
            this.setState({ show });
            this.setState({ scale });
            this.props.setOpen(false);
          }}>
          <Flex gap={20} style={{ height: "500px" }} justify="center">
            <label style={{ cursor: "pointer" }}>
              <input
                name="upload-img-input"
                type="file"
                onChange={(e) => {
                  const show = true;
                  this.setState({ show });
                  this.handleNewImage(
                    e as unknown as { target: { files: File[] } }
                  );
                  e.target.value = "";
                }}
              />
              <h3>
                <Image
                  width={70}
                  height={70}
                  preview={false}
                  src="data:image/png;base64,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"></Image>
              </h3>
            </label>
            {this.state.show && (
              <Flex gap={20} vertical justify="center" align="center">
                <ReactAvatarEditor
                  ref={this.setEditorRef}
                  scale={parseFloat(this.state.scale)}
                  width={this.state.width}
                  height={this.state.height}
                  position={this.state.position}
                  onPositionChange={this.handlePositionChange}
                  rotate={parseFloat(this.state.rotate)}
                  borderRadius={
                    this.state.width / (100 / this.state.borderRadius)
                  }
                  image={this.state.image}
                  color={[255, 255, 255, 0.6]}
                  className="editor-canvas"
                />
                <Flex gap={10}>
                  <div>Խոշորացում</div>
                  <input
                    name="scale"
                    type="range"
                    onChange={this.handleScale}
                    min={this.state.allowZoomOut ? "0.1" : "1"}
                    max="4"
                    step="0.01"
                    defaultValue="1"
                  />
                </Flex>
                <Flex>
                  <Button onClick={this.handleSubmit}>Ավելացնել</Button>
                </Flex>
              </Flex>
            )}
          </Flex>
        </Modal>
      </Flex>
    );
  }
}
export default TreeModal;
