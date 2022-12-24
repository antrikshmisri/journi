import React from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import { Text, Description, Button, ButtonGroup, useTheme } from "@geist-ui/core";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import MenuBar from "./MenuBar";
import { getBubbleMenuConfig } from "../../utils/editor";

import "./styles.css";

const Editor = ({ journal, closeCallback }) => {
  const { content, date, title } = journal;
  const theme = useTheme();

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: content,
  });

  // @TODO: Refactor this into a separate component, reused in MenuBar
  const _renderBubbleMenuButton = (icon, action, actionName, buttonTooltip) => {
    let btnClassName = "";
    let isActive = false;

    if (actionName.startsWith("heading")) {
      const headingLevel = actionName.replace("heading", "");
      isActive = editor.isActive("heading", { level: headingLevel });
    } else {
      isActive = editor.isActive(actionName);
    }

    if (isActive) {
      btnClassName += "active";
    } else {
      btnClassName += "inactive";
    }

    return (
      <Button
        className={`editor-btn ${btnClassName}`}
        auto
        scale={2 / 3}
        onClick={action}
        style={{ color: theme.palette.foreground }}
      >
        {icon}
      </Button>
    );
  };

  const _renderBubbleMenu = () => {
    const bubbleMenuConfig = getBubbleMenuConfig(editor);

    return editor ? (
      <BubbleMenu editor={editor}>
        <ButtonGroup
          className="editor-btn-group"
          ghost
          type="secondary-light"
          scale={2 / 3}
          style={{background: theme.palette.background}}
        >
          {Object.entries(bubbleMenuConfig).map(([actionName, config]) => {
            const { icon, action, tooltip } = config;

            return _renderBubbleMenuButton(icon, action, actionName, tooltip);
          })}
        </ButtonGroup>
      </BubbleMenu>
    ) : null;
  };

  return (
    <div className="edit-container">
      <div className="heading">
        <Text h2>{title}</Text>
        <Description title="" content={date} />
      </div>
      {_renderBubbleMenu()}
      <MenuBar
        editor={editor}
        closeCallback={closeCallback}
        journal={journal}
      />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
