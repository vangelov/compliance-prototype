import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Toolbar from "@material-ui/core/Toolbar";

const styles = theme => ({
    root: {
        paddingRight: theme.spacing.unit
    },
    spacer: {
        flex: "1 1 100%"
    },
    title: {
        flex: "0 0 auto"
    }
});

export const Tabletoolbar = ({ classes, onCreate, title }) => {
    return (
        <Toolbar className={classes.root}>
            <div className={classes.title}>
                <Typography>{title}</Typography>
            </div>

            <div className={classes.spacer} />

            <IconButton onClick={onCreate}>
                <AddIcon />
            </IconButton>
        </Toolbar>
    );
};

export default withStyles(styles)(Tabletoolbar);
