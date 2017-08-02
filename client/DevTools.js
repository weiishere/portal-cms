import React from 'react';
import {createDevTools} from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import Perf from 'react-addons-perf';

export default createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h"
               changePositionKey="ctrl-w"
               defaultPosition="right"
  >
    <LogMonitor theme="tomorrow" preserveScrollTop={false}/>
  </DockMonitor>
);

/**
 * import Perf from 'react-addons-perf';
 * Perf.start()
 * Perf.stop()
 * Perf.printInclusive()
 */
window.Perf = Perf;
