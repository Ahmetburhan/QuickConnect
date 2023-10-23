import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Background, useReactFlow,
} from "reactflow";
import NodeConnection from "./Nodes/NodeConnection"
import "./QuickConnectCharts.css";
import 'reactflow/dist/style.css';


import CustomEdge from './Nodes/CustomEdge';
import QuickConnectNode,{QuickConnectNodeData} from "./Nodes/QuickConnectNode"
import { FiFile } from 'react-icons/fi';
import {Oracle, Port, GCP} from "./ProviderLogo/ProviderLogo";


const eqConnectionEdge ={
  strokeWidth: 4,
  stroke: '#C3C9D5'}
const defaultViewport = { x: 0, y: 0, zoom: 0.75 };

const QuickConnectCharts = () => {
  const initialNodes: Node<QuickConnectNodeData>[] = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { icon: <Port/>, title: 'Silicon Valley (SV1)', subline: 'gen-l2-perm-SV5-L-QinQ-BO-PRI' },
    type: 'quickconnect',
  },
  {
    id: '2',
    position: { x: 300, y: 0 },
    data: { icon: null,title: '50 MBs', subline: '15ms' },
    type: 'quickconnect',
  },
  {
    id: '3',
    position: { x: 0, y: 150 },
    data: { icon: <Port/>, title: 'Silicon Valley (SV1)', subline: 'gen-l2-perm-SV5-L-QinQ-BO-PRI' },
    type: 'quickconnect',
  },
  {
    id: '4',
    position: { x: 300, y: 150 },
    data: { icon: null,title: '50 MBs', subline: '15ms' },
    type: 'quickconnect',
  },
  {
    id: '5',
    position: { x: 550, y: 75 },
    data: { icon: <Oracle/>, title: 'Ashburn (us-east-1)', subline: 'Oracle Cloud Infrastructure' },
    type: 'quickconnect',
  },
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    style : {...eqConnectionEdge},
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    style : {...eqConnectionEdge},
  },
  {
    id: 'e2-5',
    source: '2',
    target: '5',
    style : {...eqConnectionEdge},
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    style : {...eqConnectionEdge},
  },
];
  // const initialNodes = [
  //   {
  //     id: "node-1",
  //     sourcePosition: "right",
  //     type: "input",
  //     data: { label: "Silicon Valley (SV1) gen-l2-perm-SV5-L-QinQ-BO-PRI-10G-JUN-149" },
  //     position: { x: 0, y: 100 },
  //     style: {
  //       "border-color": "blue",
  //       background: "aliceblue"
  //     }
  //   },
  //   {
  //     id: "node-2",
  //     sourcePosition: "right",
  //     targetPosition: "left",
  //     data: {
  //       label: (
  //         <h6
  //           onClick={() =>
  //             {alert(JSON.stringify({
  //               position: "top",
  //               title: "Pipeline inititated",
  //               description:
  //                 "We've initialized pipeline. Alert of status will be sent via email.",
  //               status: "success",
  //               duration: 9000,
  //               isClosable: true
  //             }))}
  //           }
  //         >
  //           Generate Infrastructure Configration
  //         </h6>
  //       )
  //     },
  //     position: { x: 250, y: 0 },
  //     style: {
  //       "border-color": "green",
  //       background: "#4fdf38"
  //     }
  //   },
  //   {
  //     id: "node-3",
  //     sourcePosition: "right",
  //     targetPosition: "left",
  //        data: { icon: <FiFile />, title: 'concat', subline: 'api, sdk' },
  //     position: { x: 250, y: 200 },
  //     style: {
  //       "border-color": "black",
  //       background: "#ff00008c"
  //     },
  //      type: 'quickconnect',

  //   },
  //   {
  //     id: "node-4",
  //     sourcePosition: "right",
  //     targetPosition: "left",
  //     data: { label: "Provision Infra Resources" },
  //     style: {
  //       "border-color": "black",
  //       background: "yellow"
  //     },
  //     position: { x: 500, y: 0 }
  //   },
  //   {
  //     id: "node-5",
  //     sourcePosition: "top",
  //     targetPosition: "bottom",
  //     data: { label: "Node 5" },
  //     position: { x: 500, y: 100 }
  //   },
  //   {
  //     id: "node-6",
  //     sourcePosition: "bottom",
  //     targetPosition: "top",
  //     data: { label: "Test Pipeline Availibility" },
  //     position: { x: 500, y: 230 }
  //   },
  //   {
  //     id: "node-7",
  //     sourcePosition: "right",
  //     targetPosition: "left",
  //     data: { label: "Smoke Test" },
  //     position: { x: 750, y: 50 }
  //   },
  //   {
  //     id: "node-8",
  //     sourcePosition: "right",
  //     targetPosition: "left",
  //     data: { label: "Node 8" },
  //     position: { x: 750, y: 300 }
  //   }
  // ];

  // const initialEdges = [
  //   {
  //     id: "node-e1-2",
  //     source: "node-1",
  //     target: "node-2",
  //     type: "smoothstep",
  //     style : {...eqConnectionEdge},
  //   },
  //   {
  //     id: "node-e1-3",
  //     source: "node-1",
  //     target: "node-3",
  //     // type: "smoothstep",
  //     style : {...eqConnectionEdge},
  //   },
  //   {
  //     id: "node-e1-4",
  //     source: "node-2",
  //     target: "node-4",
  //     type: "smoothstep",
  //     label: "edge label"
  //   },
  //   {
  //     id: "node-e3-5",
  //     source: "node-3",
  //     target: "node-5",
  //     type: "smoothstep",
  //     style : {...eqConnectionEdge},
  //     animated: true
  //   },
  //   {
  //     id: "node-e3-6",
  //     source: "node-3",
  //     target: "node-6",
  //     type: "smoothstep",
  //     style : {...eqConnectionEdge},
  //     animated: true
  //   },
  //   {
  //     id: "node-e5-7",
  //     source: "node-5",
  //     target: "node-7",
  //     type: "smoothstep",
  //     style : {...eqConnectionEdge},
  //     animated: true
  //   },
  //   {
  //     id: "node-e6-8",
  //     source: "node-6",
  //     target: "node-8",
  //     type: "smoothstep",
  //     style : {...eqConnectionEdge},
  //     animated: true
  //   }
  // ];
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
   const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), []);

  const nodeTypes = {
  quickconnect: QuickConnectNode,
};
  const edgeTypes = {
  quickconnect: CustomEdge,
};
const defaultEdgeOptions = {
  type: 'quickconnect',
  markerEnd: 'edge-circle',
  markerStart: 'edge-circle'
};

  const { fitView } = useReactFlow();
  
  // const onLayout = useCallback(() => {
  //   const layouted = getLayoutedElements(nodes, edges);

  //   setNodes([...layouted.nodes]);
  //   setEdges([...layouted.edges]);

  //   window.requestAnimationFrame(() => {
  //     fitView();
  //   });
  // }, [nodes, edges]);
  // console.log(window.innerWidth)

  // this is set to always center nodes when a window resize happens 
const [dimensions, setDimensions] = useState({ 
    height: window.innerHeight,
    width: window.innerWidth
  })
  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })

}
    window.addEventListener('resize', handleResize)
      return _ => {
      window.removeEventListener('resize', handleResize)
    
}
  })
  useEffect(()=>{
    fitView()
  },[dimensions.width])

  
  return (
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        defaultViewport={defaultViewport}
        fitView
        attributionPosition="bottom-right"
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
      >

      <svg >
      <defs>
          <linearGradient id="edge-gradient">
            <stop offset="0%" stopColor="#ae53ba" />
            <stop offset="100%" stopColor="#2a8af6" />
          </linearGradient>

          <marker
            id="edge-circle"
            viewBox="-5 -5 14 14"
            refX="0"
            refY="0"
            markerUnits="strokeWidth"
            markerWidth="14"
            markerHeight="14"
            orient="auto"
          >
            <circle stroke="white" fill="#C3C9D5" strokeOpacity="0.75" r="1.5" cx="0" cy="0" />
          </marker>
        </defs>
</svg>

      </ReactFlow>
  );
};

export default QuickConnectCharts;
