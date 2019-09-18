import React, { Component } from "react";
import { View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import { connectStyle } from "native-base-shoutem-theme";
import mapPropsToStyleNames from "../Utils/mapPropsToStyleNames";
import { ToastContainer as Toast } from "./ToastContainer";
import { ActionSheetContainer as ActionSheet } from "./Actionsheet";
import { Text } from "./Text";

class Root extends Component {
  render() {
    return (
      <View ref={c => (this._root = c)} {...this.props} style={{ flex: 1 }}>
        {this.props.children}
        <Toast
          ref={c => {
            if (!Toast.toastInstance && !Toast.toastInstance._root) Toast.toastInstance = c;
          }}
        />
        <ActionSheet
          ref={c => {// 之前挂载的 ActionSheet 实例可能会在特殊的场景下，ref 会成为 null，从而影响 connectStyle 中 ref
            if (!ActionSheet.actionsheetInstance && !Actionsheet.actionsheetInstance._root)
              ActionSheet.actionsheetInstance = c;
          }}
        />
      </View>
    );
  }
}

Root.propTypes = {
  ...ViewPropTypes,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array
  ])
};

const StyledRoot = connectStyle("NativeBase.Root", {}, mapPropsToStyleNames)(
  Root
);

export { StyledRoot as Root };
