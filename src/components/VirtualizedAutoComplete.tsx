import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import useMediaQuery from '@mui/material/useMediaQuery';
import ListSubheader from '@mui/material/ListSubheader';
import Popper from '@mui/material/Popper';
import { useTheme, styled } from '@mui/material/styles';
import { VariableSizeList, ListChildComponentProps } from 'react-window';
import Typography from '@mui/material/Typography';

const LISTBOX_PADDING = 8; // px

function renderRow(props: ListChildComponentProps) {
  const { data, index, style } = props;
  const dataSet = data[index];
  const inlineStyle = {
    ...style,
    top: (style.top as number) + LISTBOX_PADDING,
    "paddingLeft": "10px",
  };

  if (dataSet.hasOwnProperty('group')) {
    return (
      <ListSubheader key={dataSet.key} component="div" sx={inlineStyle}>
        {dataSet.group}
      </ListSubheader>
    );
  }


  const { key, ...optionProps } = dataSet[0];
  const tokenInfo = (dataSet[1] as TokenInfo)
  return (
    <Typography key={key} component="li" {...optionProps} noWrap sx={inlineStyle}>
      {`${tokenInfo.symbol.toUpperCase()} | ${tokenInfo.name} | ${tokenInfo.id}`}
    </Typography>
  );
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data: any) {
  const ref = React.useRef<VariableSizeList>(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLElement>>
  (function ListboxComponent(props, ref) {
    const { children, ...other } = props;
    const itemData: React.ReactElement<unknown>[] = [];
    (children as React.ReactElement<unknown>[]).forEach(
      (
        item: React.ReactElement<unknown> & {
          children?: React.ReactElement<unknown>[];
        },
      ) => {
        itemData.push(item);
        itemData.push(...(item.children || []));
      },
    );

    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up('sm'), {
      noSsr: true,
    });
    const itemCount = itemData.length;
    const itemSize = smUp ? 36 : 48;

    const getChildSize = (child: React.ReactElement<unknown>) => {
      if (child.hasOwnProperty('group')) {
        return 48;
      }

      return itemSize;
    };

    const getHeight = () => {
      if (itemCount > 8) {
        return 8 * itemSize;
      }
      return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
    };

    const gridRef = useResetCache(itemCount);

    return (
      <div ref={ref}>
        <OuterElementContext.Provider value={other}>
          <VariableSizeList
            itemData={itemData}
            height={getHeight() + 1 * LISTBOX_PADDING}
            width="100%"
            ref={gridRef}
            outerElementType={OuterElementType}
            innerElementType="ul"
            itemSize={(index) => getChildSize(itemData[index])}
            overscanCount={5}
            itemCount={itemCount}
          >
            {renderRow}
          </VariableSizeList>
        </OuterElementContext.Provider>
      </div>
    );
  });

const StyledListboxComponent = styled(ListboxComponent)({
  color: "white",
  backgroundColor: "#2b2b3d",
});



const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
});

type TokenInfo = {
  id: string;
  name: string;
  symbol: string;
};

interface VirtualizeProps {
  setSearch: React.Dispatch<React.SetStateAction<TokenInfo | null>>
}

export default function VirtualizedAutoComplete({ setSearch }: VirtualizeProps) {
  const [tokenList, setTokenList] = React.useState<TokenInfo[]>([{ id: "bitcoin", symbol: "BTC", name: "Bitcoin" }])

  async function getTokenList() {
    try {
      const response = await fetch("http://localhost:3000/token/list")
      const data = await response.json()
      setTokenList(data)
    } catch (err) {
      console.error(err)
    }
  }


  React.useEffect(() => {
    getTokenList()
  }, [])

  return (
    <Autocomplete
      sx={{
        width: 250,
        margin: 1,
      }}
      style={{ color: "white" }}
      onChange={(_, value) => setSearch(value)}
      disableClearable
      disableListWrap
      includeInputInList
      autoHighlight

      options={tokenList}
      getOptionLabel={(option) => `${option.symbol.toUpperCase()} | ${option.name}`}
      defaultValue={{name: "Bitcoin", id: "bitcoin", symbol: "btc"}}
      renderInput={(params) =>
        <TextField
          {...params} label="Search Token"
          id="search-input"
          slotProps={{
            input: {
              ...params.InputProps,
              type: 'search',
            },
          }}
        />
      }
      renderOption={(props, option, state) =>
        [props, option, state.index] as React.ReactNode
      }
      slots={{
        popper: StyledPopper,
        listbox: StyledListboxComponent,
      }}
    />
  );
}

