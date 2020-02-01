export function handleOptionClick(payload: any) {
  const clickedIndex = payload.clickedIndex;
  let newFilterOptions = payload.filterOptions;
  const checkAll = () => {
    if (
      Object.entries(newFilterOptions).every((item, i) => {
        if (i === 0) {
          return true;
        } else if (item[1] === true) {
          return true;
        }
      })
    ) {
      newFilterOptions = {
        all: true,
        non_stop: true,
        one_stop: true,
        two_stop: true,
        three_stop: true
      };
    } else {
      newFilterOptions = {
        ...newFilterOptions,
        all: false
      };
    }
  };

  switch (+clickedIndex) {
    case 0: {
      if (
        Object.entries(payload.filterOptions).every((item, index) => {
          if (item[1] === true) return true;
          return false;
        })
      ) {
        newFilterOptions = {
          all: false,
          non_stop: false,
          one_stop: false,
          two_stop: false,
          three_stop: false
        };
      } else
        newFilterOptions = {
          all: true,
          non_stop: true,
          one_stop: true,
          two_stop: true,
          three_stop: true
        };

      break;
    }
    case 1: {
      newFilterOptions = {
        ...newFilterOptions,
        non_stop: !newFilterOptions.non_stop
      };
      checkAll();
      break;
    }
    case 2: {
      newFilterOptions = {
        ...newFilterOptions,
        one_stop: !newFilterOptions.one_stop
      };
      checkAll();
      break;
    }
    case 3: {
      newFilterOptions = {
        ...newFilterOptions,
        two_stop: !newFilterOptions.two_stop
      };
      checkAll();
      break;
    }
    case 4: {
      newFilterOptions = {
        ...newFilterOptions,
        three_stop: !newFilterOptions.three_stop
      };
      checkAll();
      break;
    }
    default: {
      newFilterOptions = {
        all: true,
        non_stop: true,
        one_stop: true,
        two_stop: true,
        three_stop: true
      };
    }
  }
  return newFilterOptions;
}
