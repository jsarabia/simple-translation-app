import { Button } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {createProject, useProjects} from "../context/upload/ProjectsContext";


function AppBar() {

    const [{projects, type}, dispatch] = useProjects();

    return (
        <div className="app_bar">
            <Button component="div" color="info" variant="contained" sx={{margin: 1, minWidth:48, maxWidth: 48, height: 48}} onClick={() => { window.location.reload() }}>
                <HomeIcon />
            </Button>
        
            <Button color="info" variant="contained" component="label" sx={{margin: 1, minWidth:48, maxWidth: 48, height: 48}}>
                <input hidden type="file" accept=".usfm, .usfm3, .USFM, .USFM3" onChange={(event) => {
                    const files = event.target.files;
                    for (const file of files) {
                        createProject(dispatch, projects, file);
                    }
                }}>
                </input>
                <FileUploadIcon />
            </Button>
        </div>
    );
}

export default AppBar;