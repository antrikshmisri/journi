import React from "react";
// import "react-tiny-fab/dist/styles.css";

import { connect } from "react-redux";
import { useTheme, ButtonGroup, Button, Tooltip } from "@geist-ui/core";
import { UpdateJournal } from "../../store/actions/journalActions";
import { getToolbarConfig } from "../../utils/editor";
import "./styles.css";

const MenuBar = ({ editor, closeCallback, UpdateJournal, journal }) => {
  const theme = useTheme();

  if (!editor) {
    return null;
  }

  const saveAndClose = () => {
    handleOnSave();
    closeCallback();
  }

  const handleOnSave = () => {
    const updatedJournal = {
      ...journal,
      content: editor.getHTML(),
    };

    UpdateJournal(updatedJournal);
  };

  const _renderToolbarButton = (icon, action, actionName, buttonTooltip) => {
    let btnClassName = "";
    let isActive = false;

    if (actionName.startsWith("heading")) {
      const headingLevel = actionName.replace("heading", "");
      isActive = editor.isActive("heading", { level: headingLevel });
    } else {
      isActive = editor.isActive(actionName);
    }

    if (actionName === "save" || actionName === "back") {
      isActive = true;
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
        style={{ color: theme.palette.foreground}}
      >
        {icon}
      </Button>
    );
  };

  const _renderToolbar = () => {
    const TOOLBAR_ACTION_CONFIG = getToolbarConfig(editor);

    let sortedActions = Object.entries(TOOLBAR_ACTION_CONFIG).sort((a, b) => {
      const aConfig = a[1];
      const bConfig = b[1];

      if (aConfig.renderLast && !bConfig.renderLast) {
        return 1;
      } else if (!aConfig.renderLast && bConfig.renderLast) {
        return -1;
      }

      return 0;
    });

    return (
      <div className="editor-toolbar" style={{ zIndex: 200 }}>
        <ButtonGroup
          className="editor-btn-group"
          ghost
          type="secondary-light"
          scale={2 / 3}
        >
          {Object.entries(sortedActions).map(([order, actionArray]) => {
            const [actionName, config] = actionArray;
            const { icon, action, tooltip } = config;

            switch(actionName) {
              case "save":
                return _renderToolbarButton(icon, handleOnSave, actionName, tooltip);
              case "back":
                return _renderToolbarButton(icon, saveAndClose, actionName, tooltip);
              default:
                return _renderToolbarButton(icon, action, actionName, tooltip);
            }
          })}
        </ButtonGroup>
      </div>
    );
  };

  return _renderToolbar();
};

const mapDispatchToProps = (dispatch) => ({
  UpdateJournal: (journal) => dispatch(UpdateJournal(journal)),
});

export default connect(null, mapDispatchToProps)(MenuBar);
