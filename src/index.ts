// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import {
  Menu
} from '@phosphor/widgets';

import {
  ICommandPalette, IMainMenu
} from '@jupyterlab/apputils';

import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import {
  PageConfig, URLExt
} from '@jupyterlab/coreutils';


/**
 * The command IDs used by the plugin.
 */
export
namespace CommandIDs {
  export
  const controlPanel: string = 'hub:control-panel';

  export
  const logout: string = 'hub:logout';
  
  export
  const tensorBoard: string = 'hub:tensor-board';
};


/**
 * Activate the jupyterhub extension.
 */
function activateHubExtension(app: JupyterLab, palette: ICommandPalette, mainMenu: IMainMenu): void {

  // This config is provided by JupyterHub by the single-user server app
  // via in dictionary app.web_app.settings['page_config_data'].
  let hubHost = PageConfig.getOption('hub_host');
  let hubPrefix = PageConfig.getOption('hub_prefix');

  if (!hubPrefix) {
    console.log('jupyterlab-hub: No configuration found.');
    return;
  }

  console.log('jupyterlab-hub: Found configuration ',
              {hubHost: hubHost, hubPrefix: hubPrefix});

  const category = 'Hub';
  const { commands } = app;

  commands.addCommand(CommandIDs.controlPanel, {
    label: 'Control Panel',
    caption: 'Open the Hub control panel in a new browser tab',
    execute: () => {
      window.open(hubHost + URLExt.join(hubPrefix, 'home'), '_blank');
    }
  });

  
  commands.addCommand(CommandIDs.tensorBoard, {
    label: 'Tensor Board',
    caption: 'Open tensor board in a new browser tab',
    execute: () => {
      window.open("10.125.0.137:32006", '_blank');
    }
  });

  commands.addCommand(CommandIDs.logout, {
    label: 'Logout',
    caption: 'Log out of the Hub',
    execute: () => {
      window.open(hubHost + URLExt.join(hubPrefix, 'logout'), '_blank');
    }
  });

  // Add commands and menu itmes.
  let menu = new Menu({ commands });
  menu.title.label = category;
  [
    CommandIDs.controlPanel,
    CommandIDs.tensorBoard,
    CommandIDs.logout,
  ].forEach(command => {
    palette.addItem({ command, category });
    menu.addItem({ command });
  });
  mainMenu.addMenu(menu, {rank: 100});
}


/**
 * Initialization data for the jupyterlab_hub extension.
 */
const hubExtension: JupyterLabPlugin<void> = {
  activate: activateHubExtension,
  id: 'jupyter.extensions.jupyterlab-hub',
  requires: [
    ICommandPalette,
    IMainMenu,
  ],
  autoStart: true,
};

export default hubExtension;

