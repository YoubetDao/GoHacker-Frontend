import React from "react";

const GlowBackground = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* 外层光圈 - 逆时针旋转 */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          width: 406,
          height: 406,
          marginLeft: -203,
          marginTop: -203,
          aspectRatio: "1 / 1",
          background:
            "linear-gradient(229deg, #f0a7ff 13%, rgba(201, 110, 240, 0) 35%, rgba(164, 92, 219, 0) 64%, #b084e8 88%)",
          borderRadius: "363px",
          animation: "rotateReverse 20s linear infinite",
          filter: "blur(15px)",
          willChange: "transform",
          zIndex: 1,
        }}
      />

      {/* 内层光圈 - 顺时针旋转 - 初始偏移90度 */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          width: 300,
          height: 300,
          transform: "translate(-50%, -50%) rotate(90deg)",
          aspectRatio: "1 / 1",
          background:
            "linear-gradient(141deg, #f0a7ff 13%, rgba(201, 110, 240, 0) 35%, rgba(164, 92, 219, 0) 64%, #b084e8 88%)",
          borderRadius: "363px",
          animation: "rotateWithOffset 15s linear infinite",
          filter: "blur(10px)",
          willChange: "transform",
          zIndex: 2,
        }}
      />

      <style>{`
        @keyframes rotateWithOffset {
          from { transform: translate(-50%, -50%) rotate(90deg); }
          to { transform: translate(-50%, -50%) rotate(450deg); }
        }

        @keyframes rotateReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
      `}</style>
    </div>
  );
};

export default GlowBackground;
