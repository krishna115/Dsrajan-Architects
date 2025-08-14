import React, { useState } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import { blockTemplates } from './blocks';
import type { KonvaEventObject } from 'konva/lib/Node';

// Grid and canvas config
const GRID_SIZE = 40;
const STAGE_WIDTH = 800;
const STAGE_HEIGHT = 600;

// Block type definition
type Block = {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
};

let idCounter = 1000; // To give unique IDs to new blocks

export default function CAD() {
  const [blocks, setBlocks] = useState<Block[]>([]); // ✅ Typed properly

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    template: { type: string; width: number; height: number; fill: string }
  ) => {
    e.dataTransfer.setData('application/json', JSON.stringify(template));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const stage = document.getElementById('floor-stage');
    if (!stage) return;

    const stageRect = stage.getBoundingClientRect();

    const offsetX = e.clientX - stageRect.left;
    const offsetY = e.clientY - stageRect.top;

    const data = JSON.parse(e.dataTransfer.getData('application/json'));

    const snappedX = Math.round(offsetX / GRID_SIZE) * GRID_SIZE;
    const snappedY = Math.round(offsetY / GRID_SIZE) * GRID_SIZE;

    const newBlock: Block = {
      id: String(idCounter++),
      name: data.type,
      x: snappedX,
      y: snappedY,
      width: data.width,
      height: data.height,
      fill: data.fill,
    };

    setBlocks((prev) => [...prev, newBlock]); // ✅ Works now
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleBlockDragEnd = (e: KonvaEventObject<DragEvent>, id: string) => {
    const { x, y } = e.target.position();

    setBlocks((prev) =>
      prev.map((block) =>
        block.id === id
          ? {
              ...block,
              x: Math.round(x / GRID_SIZE) * GRID_SIZE,
              y: Math.round(y / GRID_SIZE) * GRID_SIZE,
            }
          : block
      )
    );
  };

  const renderGrid = () => {
    const lines = [];
    for (let i = 0; i < STAGE_WIDTH / GRID_SIZE; i++) {
      lines.push(<Rect key={`v${i}`} x={i * GRID_SIZE} y={0} width={1} height={STAGE_HEIGHT} fill="#ddd" />);
    }
    for (let j = 0; j < STAGE_HEIGHT / GRID_SIZE; j++) {
      lines.push(<Rect key={`h${j}`} x={0} y={j * GRID_SIZE} width={STAGE_WIDTH} height={1} fill="#ddd" />);
    }
    return lines;
  };

  return (
    <div className="flex mt-30">
      {/* Sidebar */}
      <div style={{ width: 150, borderRight: '1px solid #ccc', padding: 10 }}>
        <h3>🧰 Toolbox</h3>
        {blockTemplates.map((item, idx) => (
          <div
            key={idx}
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
            style={{
              marginBottom: 10,
              padding: '8px',
              backgroundColor: item.fill,
              color: 'white',
              textAlign: 'center',
              borderRadius: 6,
              cursor: 'grab',
            }}
          >
            {item.type}
          </div>
        ))}
      </div>

      {/* Canvas */}
      <div
        id="floor-stage"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{ width: STAGE_WIDTH, height: STAGE_HEIGHT }}
      >
        <Stage
          width={STAGE_WIDTH}
          height={STAGE_HEIGHT}
          style={{ border: '1px solid #ccc', background: '#fafafa' }}
        >
          <Layer>{renderGrid()}</Layer>
          <Layer>
            {blocks.map((block) => (
              <React.Fragment key={block.id}>
                <Rect
                  x={block.x}
                  y={block.y}
                  width={block.width}
                  height={block.height}
                  fill={block.fill}
                  draggable
                  onDragEnd={(e) => handleBlockDragEnd(e, block.id)}
                  shadowBlur={5}
                  cornerRadius={4}
                />
                <Text
                  x={block.x}
                  y={block.y + block.height / 2 - 8}
                  width={block.width}
                  align="center"
                  text={block.name}
                  fontSize={14}
                  fill="black"
                />
              </React.Fragment>
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
