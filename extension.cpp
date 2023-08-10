#include "pxt.h"
#include "extension.h"
#include "MicroBit.h"

using namespace pxt;

// Comment changes to cause Makecode to notice the file!
namespace DataLoggerPages {
    uint8_t _block[129] = { 0 };
    int _blockSize = 128;

    //%
    int nativeFlashLength() {
#if MICROBIT_CODAL
        return uBit.log.getDataLength( DataFormat::CSV );
#else
        return 0;
#endif
    }

    int readLogLine( ManagedString buffer, int start ) {
#if MICROBIT_CODAL
        int remainingFlash = uBit.log.getDataLength( DataFormat::CSV ) - start;

        int i = 0;
        while( remainingFlash > 0 ) {
            memset( _block, 0, 129 );
            int l = min(_blockSize, remainingFlash);

            int readLen = uBit.log.readData( _block, i, l, DataFormat::CSV, remainingFlash )
            remainingFlash = remainingFlash - readLen;

            for( int j=0; j<l; j++ ) {
                buffer += _block[j];
                if( _block[j] == '\n' )
                    return i+j;
            }

            // No more flash, return what we have
            if( remainingFlash < 1 )
                return i+l;
        }
#else
        return 0;
#endif
    }

    //%
    long getFlashTally( int page, int section, int index, ManagedString column ) {
    }

}
