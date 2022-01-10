function updateClassName(box, action, classNames) {
  classNames.split(/\s+/).forEach(name => {
    if (name) {
      box.classList[action](name);
    }
  });
}

const classNamePlugin = {
  name: 'className',
  defaultValue: '',

  fn(instance) {
    const box = instance.popper.firstElementChild;

    const isDefaultRenderFn = () => {
      var _instance$props$rende;

      return !!((_instance$props$rende = instance.props.render) !== null && _instance$props$rende !== void 0 && _instance$props$rende.$$tippy);
    };

    function add() {
      if (instance.props.className && !isDefaultRenderFn()) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(['Cannot use `className` prop in conjunction with', '`render` prop. Place the className on the element you are', 'rendering.'].join(' '));
        }

        return;
      }

      updateClassName(box, 'add', instance.props.className);
    }

    function remove() {
      if (isDefaultRenderFn()) {
        updateClassName(box, 'remove', instance.props.className);
      }
    }

    return {
      onCreate: add,
      onBeforeUpdate: remove,
      onAfterUpdate: add
    };
  }

};

const appendClassName = (container, selector, className) => {
  const target = container.querySelector(selector);

  if (target) {
    target.classList.add(className);
  }
};

const prefixClassNamePlugin = {
  name: "prefixClassName",
  defaultValue: "",

  fn(instance) {
    return {
      onCreate(instance) {
        const box = instance.popper.firstElementChild;
        const prefixCls = instance.props.prefixClassName || "ft-popover";

        if (box) {
          box.classList.add(prefixCls);
          appendClassName(box, ".tippy-content", `${prefixCls}-content`);
          appendClassName(box, ".tippy-arrow", `${prefixCls}-arrow`);
          appendClassName(box, ".tippy-backdrop", `${prefixCls}-backdrop`);
        }
      }

    };
  }

};

function isType(value, type) {
  const str = {}.toString.call(value);
  return str.indexOf('[object') === 0 && str.indexOf(`${type}]`) > -1;
}
function normalizeToArray(value) {
  return [].concat(value);
}
function getOwnerDocument(elementOrElements) {
  var _element$ownerDocumen;

  const element = normalizeToArray(elementOrElements)[0]; // Elements created via a <template> have an ownerDocument with no reference to the body

  return element !== null && element !== void 0 && (_element$ownerDocumen = element.ownerDocument) !== null && _element$ownerDocumen !== void 0 && _element$ownerDocumen.body ? element.ownerDocument : document;
}
function isMouseEvent(value) {
  return isType(value, 'MouseEvent');
}
let mouseCoords = {
  clientX: 0,
  clientY: 0
};
let activeInstances = [];

function storeMouseCoords({
  clientX,
  clientY
}) {
  mouseCoords = {
    clientX,
    clientY
  };
}

function addMouseCoordsListener(doc) {
  doc.addEventListener('mousemove', storeMouseCoords);
}

function removeMouseCoordsListener(doc) {
  doc.removeEventListener('mousemove', storeMouseCoords);
}

const followCursor = {
  name: 'followCursor',
  defaultValue: false,

  fn(instance) {
    const reference = instance.reference;
    const doc = getOwnerDocument(instance.props.triggerTarget || reference);
    let isInternalUpdate = false;
    let wasFocusEvent = false;
    let isUnmounted = true;
    let prevProps = instance.props;

    function getIsInitialBehavior() {
      return instance.props.followCursor === 'initial' && instance.state.isVisible;
    }

    function addListener() {
      doc.addEventListener('mousemove', onMouseMove);
    }

    function removeListener() {
      doc.removeEventListener('mousemove', onMouseMove);
    }

    function unsetGetReferenceClientRect() {
      isInternalUpdate = true;
      instance.setProps({
        getReferenceClientRect: null
      });
      isInternalUpdate = false;
    }

    function onMouseMove(event) {
      // If the instance is interactive, avoid updating the position unless it's
      // over the reference element
      const isCursorOverReference = event.target ? reference.contains(event.target) : true;
      const {
        followCursor
      } = instance.props;
      const {
        clientX,
        clientY
      } = event;
      const rect = reference.getBoundingClientRect();
      const relativeX = clientX - rect.left;
      const relativeY = clientY - rect.top;

      if (isCursorOverReference || !instance.props.interactive) {
        instance.setProps({
          // @ts-ignore - unneeded DOMRect properties
          getReferenceClientRect() {
            const rect = reference.getBoundingClientRect();
            let x = clientX;
            let y = clientY;

            if (followCursor === 'initial') {
              x = rect.left + relativeX;
              y = rect.top + relativeY;
            }

            const top = followCursor === 'horizontal' ? rect.top : y;
            const right = followCursor === 'vertical' ? rect.right : x;
            const bottom = followCursor === 'horizontal' ? rect.bottom : y;
            const left = followCursor === 'vertical' ? rect.left : x;
            return {
              width: right - left,
              height: bottom - top,
              top,
              right,
              bottom,
              left
            };
          }

        });
      }
    }

    function create() {
      if (instance.props.followCursor) {
        activeInstances.push({
          instance,
          doc
        });
        addMouseCoordsListener(doc);
      }
    }

    function destroy() {
      activeInstances = activeInstances.filter(data => data.instance !== instance);

      if (activeInstances.filter(data => data.doc === doc).length === 0) {
        removeMouseCoordsListener(doc);
      }
    }

    return {
      onCreate: create,
      onDestroy: destroy,

      onBeforeUpdate() {
        prevProps = instance.props;
      },

      onAfterUpdate(_, {
        followCursor
      }) {
        if (isInternalUpdate) {
          return;
        }

        if (followCursor !== undefined && prevProps.followCursor !== followCursor) {
          destroy();

          if (followCursor) {
            create();

            if (instance.state.isMounted && !wasFocusEvent && !getIsInitialBehavior()) {
              addListener();
            }
          } else {
            removeListener();
            unsetGetReferenceClientRect();
          }
        }
      },

      onMount() {
        if (instance.props.followCursor && !wasFocusEvent) {
          if (isUnmounted) {
            onMouseMove(mouseCoords);
            isUnmounted = false;
          }

          if (!getIsInitialBehavior()) {
            addListener();
          }
        }
      },

      onTrigger(_, event) {
        if (isMouseEvent(event)) {
          mouseCoords = {
            clientX: event.clientX,
            clientY: event.clientY
          };
        }

        wasFocusEvent = event.type === 'focus';
      },

      onHidden() {
        if (instance.props.followCursor) {
          unsetGetReferenceClientRect();
          removeListener();
          isUnmounted = true;
        }
      }

    };
  }

};

export { classNamePlugin, followCursor, getOwnerDocument, isMouseEvent, isType, normalizeToArray, prefixClassNamePlugin };
