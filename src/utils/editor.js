import { HEADING_LEVELS } from "../constants/editor";

import Bold from "@geist-ui/icons/bold";
import Italic from "@geist-ui/icons/italic";
import Code from "@geist-ui/icons/code";
import List from "@geist-ui/icons/list";
import Edit from "@geist-ui/icons/edit";
import Info from "@geist-ui/icons/info";
import Save from "@geist-ui/icons/save";
import Image from "@geist-ui/icons/image";
import ArrowLeftCircle from "@geist-ui/icons/arrowLeftCircle";

import { Text } from "@geist-ui/core";

const ICONS = {
  bold: <Bold size={13} className="editor-btn-icon" />,
  italic: <Italic size={13} className="editor-btn-icon" />,
  code: <Code size={13} className="editor-btn-icon" />,
  paragraph: <Text>P</Text>,
  list: <List size={13} className="editor-btn-icon" />,
  edit: <Edit size={13} className="editor-btn-icon" />,
  info: <Info size={13} className="editor-btn-icon" />,
  save: <Save size={13} className="editor-btn-icon" />,
  back: <ArrowLeftCircle size={13} className="editor-btn-icon" />,
  image: <Image size={13} className="editor-btn-icon" />,
};

const generateHeadingConfig = (editor) => {
  let headingConfigs = {};

  HEADING_LEVELS.forEach((level) => {
    const headingIcon = <Text>H{level}</Text>;

    let config = {
      renderLast: false,
      action: () => editor.chain().focus().toggleHeading({ level }).run(),
      tooltip: `Heading ${level}`,
      icon: headingIcon,
      actionCb: () => {},
    };
    headingConfigs[`heading${level}`] = config;
  });

  return headingConfigs;
};

const getToolbarConfig = (editor) => {
  const headingConfigs = generateHeadingConfig(editor);

  const TOOLBAR_ACTION_CONFIG = {
    bold: {
      renderLast: false,
      action: () => editor.chain().focus().toggleBold().run(),
      tooltip: "Bold",
      icon: ICONS.bold,
    },
    italic: {
      renderLast: false,
      action: () => editor.chain().focus().toggleItalic().run(),
      tooltip: "Italic",
      icon: ICONS.italic,
    },
    code: {
      renderLast: false,
      action: () => editor.chain().focus().toggleCode().run(),
      tooltip: "Code",
      icon: ICONS.code,
    },
    paragraph: {
      renderLast: false,
      action: () => editor.chain().focus().setParagraph().run(),
      tooltip: "Paragraph",
      icon: ICONS.paragraph,
    },
    bulletList: {
      renderLast: false,
      action: () => editor.chain().focus().toggleBulletList().run(),
      tooltip: "Bullet List",
      icon: ICONS.list,
    },
    image: {
      renderLast: false,
      action: () =>
        editor
          .chain()
          .focus()
          .setImage({ src: "https://picsum.photos/200/300" })
          .run(),
      tooltip: "Image",
      icon: ICONS.image,
    },
    back: {
      renderLast: true,
      action: () => {},
      tooltip: "Back",
      icon: ICONS.back,
    },
    save: {
      renderLast: true,
      action: () => {},
      tooltip: "Save",
      icon: ICONS.save,
    },
    ...headingConfigs,
  };

  return TOOLBAR_ACTION_CONFIG;
};

const getBubbleMenuConfig = (editor) => {
  const allToolbarActions = getToolbarConfig(editor);

  const BUBBLE_MENU_CONFIG = {
    bold: allToolbarActions.bold,
    italic: allToolbarActions.italic,
    code: allToolbarActions.code,
    bulletList: allToolbarActions.bulletList,
    heading1: allToolbarActions.heading1,
    heading2: allToolbarActions.heading2,
  }

  return BUBBLE_MENU_CONFIG;
}

export { getToolbarConfig, getBubbleMenuConfig };
