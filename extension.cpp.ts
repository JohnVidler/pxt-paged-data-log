#include "pxt.h"
#include "MicroBit.h"

using namespace pxt;

namespace DataLoggerPages {
    //%
    uint32_t nativeFlashLength() {
        codal::MicroBit uBit;

        return uBit.log.getDataLength( codal::DataFormat::CSV );
    }
}