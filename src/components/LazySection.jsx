import React, { Suspense, useEffect, useRef, useState } from "react";

// Mounts a lazily imported section only once it is close to the viewport,
// so heavy bundles (three.js, timelines, forms) stay off the critical path.
const LazySection = ({ load, minHeight = 600, id }) => {
  const ref = useRef(null);
  const [Component, setComponent] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "800px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let active = true;
    load().then((mod) => active && setComponent(() => mod.default));
    return () => {
      active = false;
    };
  }, [visible, load]);

  return (
    <div ref={ref} id={Component ? undefined : id} style={Component ? undefined : { minHeight }}>
      <Suspense fallback={null}>{Component ? <Component /> : null}</Suspense>
    </div>
  );
};

export default LazySection;
